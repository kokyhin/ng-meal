module.exports = {
  createUser: (email, link) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: email,
      subject: 'Meal account activation',
      text: `Please follow this URL ${link} to activate account`,
    };
  },

  resetPassword: (email, link) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: email,
      subject: 'Meal password reset',
      text: `Please follow this URL ${link} to reset your password`,
    };
  },

  schedule: (content) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: 'mracila@fusionworks.md',
      subject: 'Заказы',
      text: content,
    }
  },

  notification: (emails, content) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: emails,
      subject: 'Уведомление ⚠️',
      text: content,
    }
  },

  menuChanged: (emails, content, date) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: emails,
      subject: 'Изменения в меню на '+ date +'  ⚠️',
      text: content,
    }
  }
}
