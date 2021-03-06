/**
 * @fileoverview
 * instanciate a "login via Doors" in menubar
 * @todo
 *    - package.json
 *
 * @version 1
 * @copyright ISCPIF-CNRS 2016
 * @author romain.loth@iscpif.fr
 */

// add the form element in all pages that load us
cmxClt.elts.box.addAuthBox({'mode':'login', 'insertCaptcha': true})

// initialize form controllers
var menuUForm = cmxClt.uauth.AuthForm(
    'auth_box',
    topLoginValidate,
    {'type': "login",
     'validateCaptcha': true,
     // ids
     'emailId': "menu_email",
     'duuidId': "doors_uid",
     'passId':  "menu_password",
     'captchaId': "menu_captcha",
     'capcheckId': "menu_captcha_hash",
     'mainMessageId': "menu_message"}
    // NB the dials aka htmlEffectTgtIds are now
    //    auto-retrieved by their classname
)
var menuSubmitButton = document.getElementById('menu_form_submit')

// trigger auth changes (useful if browser completed from cache)
menuUForm.elEmail.dispatchEvent(new CustomEvent('change'))
menuUForm.elPass.dispatchEvent(new CustomEvent('change'))
menuUForm.elCaptcha.dispatchEvent(new CustomEvent('change'))

// done when anything in the form changes
function topLoginValidate(self) {
  // console.log('topLoginValidate current EMAIL status', self.emailStatus)
  // console.log('topLoginValidate current PASS status', self.passStatus)
  // console.log('topLoginValidate current cmxClt.uauth.lastEmailStatus', cmxClt.uauth.lastEmailStatus)

  menuSubmitButton.disabled = (!self.emailStatus
                                || !self.passStatus
                                || !self.captchaStatus)
}

console.log("menubar login controllers load OK")
