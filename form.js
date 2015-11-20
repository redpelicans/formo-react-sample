import {Formo, Field, MultiField} from 'formo';
import _ from 'lodash';

export {colors, avatarTypes};

const colors = [ '#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080' ];

const avatarTypes = [
  {key: 'color', value: 'Color Picker'}, 
  {key: 'url', value: 'Logo URL'}, 
  {key: 'src', value: 'Logo File'}
];

function rndColor() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[ index ];
}

function avatartarUrlValueChecker(url){
  const promise = new Promise( (resolve, reject) => {
    setTimeout( () => resolve({checked: true, error: 'server error'}), 100);
  });
  return promise;
}

export default function person(document){
  return new Formo([
    new Field('prefix', {
      label: "Prefix",
      type: "text",
      required: true,
      defaultValue: 'Mr',
      domainValue: ['Mr', 'Mrs'],
    }),
    new Field('firstName', {
      label: "First Name",
      type: "text",
      required: true,
    }),
    new Field('lastName', {
      label: "Last Name",
      type: "text",
      required: true,
    }),
    new Field('companyId', {
      label: 'Company',
    }),
    new Field('preferred', {
      label: 'Preferred',
      defaultValue: false,
      type: 'boolean',
    }),
    new MultiField('avatar', [
      new Field('type', {
        label: "Avatar Type",
        defaultValue: 'color',
        domainValue: avatarTypes,
      }),
      new Field('url', {
        label: "URL",
        valueChecker: { checker: avatartarUrlValueChecker, debounce: 200},
      }),
      new Field('src', {
        label: "File",
      }),
      new Field('color', {
        label: "Preferred Color",
        domainValue: colors,
        defaultValue: rndColor(),
      }),
    ]),
    new Field('note', {
      label: "Note",
      type: "text",
    }),
  ], document);
}
