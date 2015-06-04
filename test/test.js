const bondo = require('../index.js');
const h = bondo.h;

// polyfills
require('document-register-element');
require('mutationobserver-shim');
//require('object.observe');

const test = require('tape');

// 1
test("Exports virtual hypserscript on h property", function (t) {
  t.plan(1);
  t.equal(h('div').tagName, 'DIV');
});

// 2
test("Replaces a Custom Element's DOM with a VDOM", function (t) {
  t.plan(2);
  bondo('el-two', function () {
    return h('div#new-two', "New Two");
  });
  t.equal(document.getElementById('old-two'), null);
  t.equal(document.getElementById('new-two').tagName, 'DIV');
});

// 3
test("View functions can use attributes of element to render", function (t) {
  t.plan(1);
  bondo('el-three', function (model) {
    return h('div#id-three', model.attributes['att-three'].value);
  });
  t.equals(document.getElementById('id-three').innerText, 'val-three');
});

/*
var test = require('tape');
test('binds model properties to attributes', function (t) {
  t.plan(1);
  var el = bondo('testOne', {username: 'user1'});
  t.equal(el.querySelector('input').value, 'user1');
});

test('when model properties change, attributes change', function (t) {
  t.plan(2);
  var model = {username: 'user2'};
  var el = bondo('testTwo', model);
  t.equal(el.querySelector('input').value, 'user2');
  model.username = 'user3';
  setTimeout(function () {
    t.equal(el.querySelector('input').value, 'user3');
  }, 0); 
});
*/