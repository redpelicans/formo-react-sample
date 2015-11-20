import Immutable from 'immutable';
import { createHistory, createHashHistory } from 'history';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import reactMixin from 'react-mixin';
import { Lifecycle } from 'react-router';
import {Formo, Field, MultiField} from 'formo';
import personForm, {colors, avatarTypes} from './form';
import {companiesStore,  companiesActions} from './models/companies';
import {personsActions} from './models/persons';
import {Content, Header, HeaderLeft, HeaderRight, Title, Form, AddBtn, UpdateBtn, CancelBtn, ResetBtn, StarField, AvatarChooserField, AvatarViewField, MarkdownEditField, InputField, SelectField} from './widgets';

@reactMixin.decorate(Lifecycle)
export class App extends Component {

  state = {
    forceLeave: false,
  }

  routerWillLeave = nextLocation => {
    if(!this.state.forceLeave && this.state.hasBeenModified) return "Are you sure you want to leave the page without saving new person?";
    return true;
  }

  handleSubmit = () => {
    this.personForm.submit();
  }

  handleCancel = () => {
    this.goBack(false);
  }

  goBack = (forceLeave) => {
    this.setState({forceLeave: forceLeave}, () => {
      this.props.history.goBack();
    });
  }

  componentWillUnmount(){
    if(this.unsubscribeSubmit) this.unsubscribeSubmit();
    if(this.unsubscribeState) this.unsubscribeState();
    if(this.unsubscribeCompanies) this.unsubscribeCompanies();
  }

  componentWillMount() {
    this.personForm = personForm();

    this.unsubscribeCompanies = companiesStore.listen( state => {
      this.setState({companies: state.data});
    });

    this.unsubscribeSubmit = this.personForm.onSubmit( state => {
      personsActions.create(this.personForm.toDocument(state));
      this.goBack(true);
    });

    this.unsubscribeState = this.personForm.onValue( state => {
      this.setState({
        canSubmit: state.canSubmit,
        hasBeenModified: state.hasBeenModified,
      });
    });

    companiesActions.load();
  }

  render(){
    let submitBtn = <AddBtn onSubmit={this.handleSubmit} canSubmit={this.state.canSubmit}/>;
    let cancelBtn = <CancelBtn onCancel={this.handleCancel}/>;

    return (
      <div>
        <EditContent 
          title={"Add a Person"} 
          submitBtn={submitBtn}
          cancelBtn={cancelBtn}
          companies={this.state.companies}
          personForm={this.personForm}/>
      </div>
    )
  }
}

export default class EditContent extends Component {
  companiesValues(){
    if(!this.props.companies) return [];
    const values = _.chain(this.props.companies.toJS())
      .map(company => { return {key: company._id, value: company.name} })
      .sortBy(x => x.value)
      .value();
    values.unshift({key: undefined, value: '<No Company>'});
    return values;
  }

  render(){
    if(!this.props.personForm) return false;

    let styles = {
      time: {
        fontSize: '.7rem',
        fontStyle: 'italic',
        display: 'block',
        float: 'right',
      }
    }

    const fakePerson = Immutable.fromJS(_.pick(this.props.personDocument, 'createdAt', 'updatedAt'));
    const companyId = this.props.personForm.field('companyId');
    companyId.schema.domainValue = this.companiesValues();

    return (
      <Content>
        <div className="row">
          <div className="col-md-12">

            <Header obj={fakePerson}>
              <HeaderLeft>
                <AvatarViewField type='person' obj={this.props.personForm}/>
                <Title title={this.props.title}/>
              </HeaderLeft>
              <HeaderRight>
                {this.props.submitBtn}
                {this.props.cancelBtn}
                <ResetBtn obj={this.props.personForm}/>
              </HeaderRight>
            </Header>

          </div>
          <div className="col-md-12 m-b"/>
          <div className="col-md-12">
            <Form>
              <div className="row">
                <div className="col-md-3">
                  <SelectField field={this.props.personForm.field('prefix')}/>
                </div>
                <div className="col-md-4">
                  <InputField field={this.props.personForm.field('firstName')}/>
                </div>
                <div className="col-md-4">
                  <InputField field={this.props.personForm.field('lastName')}/>
                </div>
                <div className="col-md-1">
                  <StarField field={this.props.personForm.field('preferred')}/>
                </div>
                <div className="col-md-12">
                  <SelectField field={companyId}/>
                </div>
                <div className="col-md-12">
                <AvatarChooserField field={this.props.personForm.field('avatar')}/>
                </div>
                <div className="col-md-12">
                  <MarkdownEditField field={this.props.personForm.field('note')}/>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Content>
    )
  }
}

const history = createHashHistory();
const routes = (
  <Route path="/" component={App}/>
);

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById("formo"));






