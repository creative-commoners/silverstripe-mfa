/* global window */

import React, { Component } from 'react';
import classnames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCompleteLogin = this.handleCompleteLogin.bind(this);
  }

  /**
   * Handle a change to the backup code input
   *
   * @param {Event} event
   */
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  /**
   * Handle pressing the "next" button after entering a backup code
   *
   * @param {Event} event
   */
  handleCompleteLogin(event) {
    event.preventDefault();

    const { onCompleteLogin } = this.props;

    onCompleteLogin({ code: this.state.value });
  }

  /**
   * Render the next button and any controls that are passed down from the parent
   *
   * @return {HTMLElement}
   */
  renderControls() {
    const { moreOptionsControl } = this.props;
    const { ss: { i18n } } = window;

    return (
      <div className="mfa-login-backup-codes__controls mfa__controls">
        <button
          className="btn btn-primary"
          disabled={this.state.value.length === 0}
          onClick={this.handleCompleteLogin}
        >
          {i18n._t('MFABackupCodesLogin.NEXT', 'Next')}
        </button>
        {moreOptionsControl}
      </div>
    );
  }

  /**
   * Render a description for this input
   *
   * @return {HTMLElement}
   */
  renderDescription() {
    const { ss: { i18n } } = window;

    return (
      <p>
        {i18n._t(
          'MFABackupCodesLogin.DESCRIPTION',
          'Use one of the recovery codes you received'
        )}
      </p>
    );
  }

  /**
   * Render the input for capturing the users backup code
   *
   * @return {HTMLElement}
   */
  renderInput() {
    const { error } = this.props;
    const { ss: { i18n } } = window;
    const label = i18n._t('MFABackupCodesLogin.LABEL', 'Enter recovery code');
    const formGroupClasses = classnames('mfa-login-backup-codes__input-container form-group', {
      'has-error': !!error,
    });

    return (
      <div className={formGroupClasses}>
        <label htmlFor="backup-code" className="control-label">
          { label }
        </label>
        <input
          className="mfa-login-backup-codes__input form-control"
          type="text"
          placeholder={label}
          id="backup-code"
          onChange={this.handleChange}
        />
        {error && <div className="help-block">
          {i18n._t('MFABackupCodesLogin.ERROR', 'Invalid recovery code')}
        </div>}
      </div>
    );
  }

  render() {
    const { graphic, leadInLabel } = this.props;

    return (
      <form className="mfa-login-backup-codes__container">
        <div className="mfa-login-backup-codes__content">
          {this.renderDescription()}
          {this.renderInput()}
        </div>
        <div>
          <img className="mfa-login-backup-codes__image" src={graphic} alt={leadInLabel} />
        </div>
        {this.renderControls()}
      </form>
    );
  }
}

export default Login;