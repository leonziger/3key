import $ from 'jquery';

import 'jquery.maskedinput/src/jquery.maskedinput';
import 'jquery-validation/dist/jquery.validate';
import 'jquery-validation/dist/localization/messages_ru';
import {openThanksModal} from "../thanks/thanks";

$.validator.addMethod('condition', function(value, element, condition) {
  if (typeof condition !== 'function') {
    throw new Error('"condition" rule must return a function');
  }

  return this.optional(element) || condition(value);
});


const cbForm = $('.contact-form');
const name = $('[name="name"]');
const phone = $('[name="phone"]');
const fieldErrorClassName = 'contact-form__field-error';
const fieldValidClassName = 'contact-form__field-valid';

phone.mask('+7 (999) 999-99-99', { autoclear: false });

const validator = cbForm.validate({
  rules: {
    name: {
      required: true,
      condition: () => (value) => {
        const expression = new RegExp(/^[а-яА-ЯёЁ\s]+$/);
        if(expression.test(value)) {
          return expression.test(value);
        }
      },
      minlength: 3
    },
    phone: {
      required: true,
      condition: () => (value) => value.indexOf('_') === -1
    }
  },

  messages: {
    name: {
      required: 'Обязательное поле для заполнения',
      condition: 'Пожалуйста, вводите только кирилицу.',
      minlength: 'Пожалуйста, вводите только кирилицу, минимум {0} символов',
    },
    phone: {
      required: 'Обязательное поле для заполнения',
      condition: 'Пожалуйста, введите правильный номер Вашего телефона.'
    }
  },

  highlight: (element) => {
    $(element).addClass(fieldErrorClassName).removeClass(fieldValidClassName);
  },

  unhighlight: (element) => {
    $(element).removeClass(fieldErrorClassName).addClass(fieldValidClassName);
  },

  errorPlacement: function(error, element) {
    error.addClass('contact-form__error-message');
    error.insertAfter(element);
  },

  submitHandler: function(form) {
    const cbData = cbForm.serializeArray().reduce((result, item) => {
      result[item.name] = item.value;
      return result;
    }, {});


    // $.post('http://zychkov.su//wp-content/themes/folio/folio/mail.php', cbData).done(function(response) {
    //   console.log(response);
      openThanksModal();
      cbForm.trigger('reset');
    // });

  }
});

