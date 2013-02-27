// Generated by CoffeeScript 1.4.0
(function() {
  var FieldListener, Nod,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FieldListener = (function() {

    function FieldListener(el, metrics, msg, nod) {
      this.el = el;
      this.metrics = metrics;
      this.msg = msg;
      this.nod = nod;
      this.toggleError = __bind(this.toggleError, this);

      this.runCheck = __bind(this.runCheck, this);

      this.delayedCheck = __bind(this.delayedCheck, this);

      this.events = __bind(this.events, this);

      this.errorMsg = this.createErrorMsg(this.msg, this.nod.settings.helpSpanDisplay);
      this.delayTime = this.nod.settings.delay;
      this.delayId = "";
      this.fieldCorrect = this.metrics[0] === 'presence' ? null : true;
      this.errorMsgPos = this.findErrorMsgPos(this.el);
      this.type = this.el.attr('type') || this.el.prop('tagName').toLowerCase();
      this.events();
    }

    FieldListener.prototype.createErrorMsg = function(msg, displayType) {
      return $('<span/>', {
        'html': msg,
        'class': this.nod.settings.errorClass + ' ' + displayType
      });
    };

    FieldListener.prototype.events = function() {
      this.el.on('keyup', this.delayedCheck);
      this.el.on('blur', this.runCheck);
      return this.el.on('change', this.runCheck);
    };

    FieldListener.prototype.delayedCheck = function() {
      clearTimeout(this.delayId);
      return this.delayId = setTimeout(this.runCheck, this.delayTime);
    };

    FieldListener.prototype.runCheck = function() {
      var value;
      value = this.type === 'checkbox' ? this.el.is(':checked') : this.el.val();
      return this.toggleError(this.nod.isCorrect(this.metrics, value));
    };

    FieldListener.prototype.toggleError = function(isCorrect) {
      if (isCorrect !== this.fieldCorrect) {
        if (isCorrect) {
          this.errorMsg.remove();
        } else {
          if (this.type === 'checkbox') {
            this.el.parent().append(this.errorMsg);
          } else {
            this.errorMsgPos.after(this.errorMsg);
          }
        }
        this.fieldCorrect = isCorrect;
        return this.nod.toggleFormControls();
      }
    };

    FieldListener.prototype.findErrorMsgPos = function(el) {
      if (this.nextElHasClass(el, this.nod.settings.errorPosClasses)) {
        return this.findErrorMsgPos(el.next());
      }
      return el;
    };

    FieldListener.prototype.nextElHasClass = function(el, selectors) {
      var s, _i, _len;
      for (_i = 0, _len = selectors.length; _i < _len; _i++) {
        s = selectors[_i];
        if (el.next(s).length) {
          return true;
        }
        false;
      }
    };

    return FieldListener;

  })();

  (function($) {
    return $.fn.nod = function(fields, settings) {
      new Nod(this, fields, settings);
      return this;
    };
  })(jQuery);

  Nod = (function() {
    var _this = this;

    function Nod(form, fields, options) {
      this.form = form;
      this.fields = fields;
      this.toggleSubmitBtn = __bind(this.toggleSubmitBtn, this);

      this.findErrorMsgs = __bind(this.findErrorMsgs, this);

      this.toggleGroupClass = __bind(this.toggleGroupClass, this);

      this.toggleFormControls = __bind(this.toggleFormControls, this);

      this.runMassCheck = __bind(this.runMassCheck, this);

      this.events = __bind(this.events, this);

      this.createFieldListeners = __bind(this.createFieldListeners, this);

      this.settings = $.extend({
        'delay': 700,
        'disableSubmitBtn': true,
        'helpSpanDisplay': 'help-inline',
        'groupClass': 'error',
        'submitBtnSelector': '[type=submit]',
        'metricsSplitter': ':',
        'errorPosClasses': ['.help-inline', '.add-on'],
        'errorClass': 'nod_msg',
        'groupSelector': '.control-group',
        'disabledAttr': 'disabled'
      }, options);
      this.txt = {
        'isntThree': "Arguments for each field must have three parts: ",
        'missingForm': "Couldn't find any form: ",
        'missingSubmit': "Couldn't find any Submit button: ",
        'missingSelector': "I need a proper selector as an argument for use                              with 'same-as'",
        'missingSecondArg': "I need a second argument when you use 'between'",
        'nan': "I need a number to check against when you use that                              selector"
      };
      this.fieldListeners = [];
      this.createFieldListeners(this.fields, this.fieldListeners);
      this.submit = this.form.find(this.settings.submitBtnSelector);
      this.checkIfElementsExist(this.form, this.submit, this.disableSubmitBtn);
      this.events();
    }

    Nod.prototype.createFieldListeners = function(fields, fieldListeners) {
      var els, field, metrics, msg, nod, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        field = fields[_i];
        if (field.length !== 3) {
          throw this.txt.isntThree + field;
        }
        nod = this;
        els = field[0];
        metrics = $.map(field[1].split(this.settings.metricsSplitter), $.trim);
        msg = field[2];
        _results.push($(els).each(function() {
          return fieldListeners.push(new FieldListener($(this), metrics, msg, nod));
        }));
      }
      return _results;
    };

    Nod.prototype.checkIfElementsExist = function(form, submit, disableSubmitBtn) {
      if (!(form.selector && form.length)) {
        throw this.txt.missingForm + form.selector;
      }
      if (!(submit.length || !disableSubmitBtn)) {
        throw this.txt.missingSubmit + submit;
      }
    };

    Nod.prototype.events = function() {
      return this.submit.on('click', this.runMassCheck);
    };

    Nod.prototype.runMassCheck = function(event) {
      var listener, _i, _len, _ref;
      _ref = this.fieldListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        listener.runCheck();
      }
      if (this.findErrorMsgs().length) {
        return event.preventDefault();
      }
    };

    Nod.prototype.toggleFormControls = function() {
      this.toggleGroupClass();
      if (this.submit && this.settings.disableSubmitBtn) {
        console.log(this.settings.disableSubmitBtn);
        return this.toggleSubmitBtn();
      }
    };

    Nod.prototype.toggleGroupClass = function() {
      var errorMsg, errorMsgs, _i, _len, _results;
      $(this.settings.groupSelector).removeClass(this.settings.groupClass);
      errorMsgs = this.findErrorMsgs();
      if (errorMsgs.length) {
        _results = [];
        for (_i = 0, _len = errorMsgs.length; _i < _len; _i++) {
          errorMsg = errorMsgs[_i];
          _results.push($(errorMsg).parents(this.settings.groupSelector).addClass(this.settings.groupClass));
        }
        return _results;
      }
    };

    Nod.prototype.findErrorMsgs = function() {
      return this.form.find("." + this.settings.errorClass);
    };

    Nod.prototype.toggleSubmitBtn = function() {
      var d, listener, state, _i, _len, _ref;
      state = 'enabled';
      d = this.settings.disabledAttr;
      _ref = this.fieldListeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        if (listener.fieldCorrect !== true) {
          state = d;
        }
      }
      return this.btn[state](this.submit, d);
    };

    Nod.prototype.btn = {
      enabled: function(btn, d) {
        return btn.removeClass(d).removeAttr(d);
      },
      disabled: function(btn, d) {
        return btn.addClass(d).attr(d, d);
      }
    };

    Nod.prototype.isCorrect = function(metrics, value) {
      var int, len, tst, _el;
      int = function(int) {
        int = parseInt(int, 10);
        if (isNaN(int)) {
          throw this.txt.nan;
        }
        return int;
      };
      len = value.length;
      tst = metrics[1] || "";
      switch (metrics[0]) {
        case 'presence':
          if (value) {
            return true;
          }
          break;
        case 'max-length':
          if (len <= int(tst)) {
            return true;
          }
          break;
        case 'min-length':
          if (len >= int(tst)) {
            return true;
          }
          break;
        case 'exact':
          if (value === tst) {
            return true;
          }
          break;
        case 'not':
          if (value !== tst) {
            return true;
          }
          break;
        case 'exact-length':
          if (len === int(tst)) {
            return true;
          }
          break;
        case 'between':
          if (!(metrics[2] && metrics[2].length)) {
            throw this.txt.missingSecondArg;
          }
          if (len >= int(tst) && len <= int(metrics[2])) {
            return true;
          }
          break;
        case 'integer':
          if (!value || /^\s*\d+\s*$/.test(value)) {
            return true;
          }
          break;
        case 'float':
          if (!value || /^[-+]?[0-9]+(\.[0-9]+)?$/.test(value)) {
            return true;
          }
          break;
        case 'same-as':
          _el = $(tst);
          if (_el.length !== 1) {
            throw this.txt.missingSelector;
          }
          if (value === _el.val()) {
            return true;
          }
          break;
        case 'email':
          if (!value || /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value)) {
            return true;
          }
      }
      return false;
    };

    return Nod;

  }).call(this);

}).call(this);
