module.exports = {
  createUser: (email, link) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: email,
      subject: 'Meal account activation',
      text: `Please follow this <a href="${link}">URL</a> to activate account`,
    };
  },

  resetPassword: (email, link) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: email,
      subject: 'Meal password reset',
      text: `Please follow this <a href="${link}">URL</a> to reset your password`,
    };
  },

  schedule: (content) => {
    return {
      from: '"FusionWorks Meal 🍔" <meal@fusionworks.md>',
      to: 'anasonov@fusionworks.md',
      subject: 'Заказы',
      text: content,
    }
  }
}
