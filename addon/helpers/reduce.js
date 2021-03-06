import Ember from 'ember';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isEmpty } from 'ember-utils';
import computed from 'ember-computed';

const { defineProperty } = Ember;

export default Helper.extend({
  compute([callback, initialValue, array]) {
    set(this, 'callback', callback);
    set(this, 'array', array);
    set(this, 'initialValue', initialValue);

    return get(this, 'content');
  },

  callbackDidChange: observer('callback', 'initialValue', function() {
    let callback = get(this, 'callback');
    let initialValue = get(this, 'initialValue');

    if (isEmpty(callback)) {
      defineProperty(this, 'content', []);
      return;
    }

    let cp = computed('array.[]', () => {
      let array = get(this, 'array');
      return array.reduce(callback, initialValue);
    });

    defineProperty(this, 'content', cp);
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
