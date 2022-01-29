/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import './FooterSection.style.css';

export default class FooterSection extends PureComponent {
	renderNavigation = () => {
		return (
			<div className="footer-links">
				<div className="footer-column-title">Navigation</div>
				<div className="footer-column-content">
					<ul>
						<li className="link-item">
							<a> Popular search</a>
						</li>
						<li className="link-item">
							<a>Write to us</a>
						</li>
						<li className="link-item">
							<a>About</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}

	renderMyProfile = () => {
		return (
			<div className="footer-links">
				<div className="footer-column-title">My Profile</div>
				<div className="footer-column-content">
					<ul>
						<li className="link-item">
							<a>Profile</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}

	renderAddress = () => {
		return (
			<div className="quick-contact-wrapper">
				<div className="quick-contact-wrapper__item">
					<div className="quick-contact-title-wrapper">
						<div className="quick-contact-icon">0</div>
						<div className="quick-contact-title">Address</div>
					</div>
					<div className="quick-contact-content">Ziepniekkalns, Rīga</div>
				</div>
			</div>
		);
	}

	renderEmail = () => {
		return (
			<div className="quick-contact-wrapper">
				<div className="quick-contact-wrapper__item">
					<div className="quick-contact-title-wrapper">
						<div className="quick-contact-icon">3</div>
						<div className="quick-contact-title">Email</div>
					</div>
					<div className="quick-contact-content">pavels@concords.lv</div>
				</div>
			</div>
		);
	}

	renderTelephone = () => {
		return (
			<div className="quick-contact-wrapper">
				<div className="quick-contact-wrapper__item">
					<div className="quick-contact-title-wrapper">
						<div className="quick-contact-icon">"</div>
						<div className="quick-contact-title">Contact</div>
					</div>
					<div className="quick-contact-content">+371 27122753</div>
				</div>
			</div>
		);
	}

	renderContact = () => {
		return (
			<div className="footer-links">
				<div className="footer-column-title">Quick Contact</div>
				<div className="footer-column-content">
					{this.renderAddress()}
					{this.renderEmail()}
					{this.renderTelephone()}
				</div>
			</div>
		);
	}

	renderFooter = () => {
		return <div className="footer-bottom">Scandiweb Entry Test 2021</div>;
	}

	render() {
		return (
			<section className="footer-container">
				<div className="footer-wrapper">
					{this.renderNavigation()}
					{this.renderMyProfile()}
					{this.renderContact()}
					{this.renderFooter()}
				</div>
			</section>
		);
	}
}
