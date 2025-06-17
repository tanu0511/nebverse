/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState,useEffect } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { useFormik } from 'formik';
import Select from '../../../components/bootstrap/forms/Select';

interface IAddContactModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onAddContact: (contact: any) => void;
    selectedContact?: any;
}

const AddContactModal: FC<IAddContactModalProps> = ({
    isOpen,
    setIsOpen,
    onAddContact,
    selectedContact,
  }) => {
    
  
    
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: selectedContact?.title || '',
        salutation: selectedContact?.salutation || '',
        name: selectedContact?.name || '',
        email: selectedContact?.email || '',
        password: '',
        country: selectedContact?.country || 'India',
        countryCode: selectedContact?.countryCode || '+93',
        mobile: selectedContact?.mobile || '',
        profilePicture: null,
        companyAddress: selectedContact?.companyAddress || '',
        gender: selectedContact?.gender || 'Male',
        language: selectedContact?.language || 'English',
        loginAllowed: selectedContact?.loginAllowed ?? 'No',
      },
      onSubmit: (values) => {
        onAddContact(values);
        formik.resetForm();
        setIsOpen(false);
      },
    });

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl" isStaticBackdrop={true}>
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="add-contact-modal-title">Account Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* Title */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="titleInput">Title</label>
                    <Input
                      id="titleInput"
                      name="title"
                      placeholder="e.g. Manager"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {/* Salutation */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="salutationInput">Salutation</label>
                    <Select
                      id="salutationInput"
                      name="salutation"
                      value={formik.values.salutation}
                      onChange={formik.handleChange}
                      ariaLabel={''}
                    >
                      <option value="">--</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </Select>
                  </div>
                  {/* Contact Name */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="nameInput">Contact Name <span className="text-danger">*</span></label>
                    <Input
                      id="nameInput"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      required
                    />
                  </div>
                  {/* Profile Picture */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="profilePictureInput">
                      Profile Picture <i className="bi bi-question-circle" title="Upload profile image" />
                    </label>
                    <div className="border rounded d-flex align-items-center justify-content-center" style={{ height: 100 }}>
                      <label className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer" htmlFor="profilePictureInput">
                        {formik.values.profilePicture ? (
                          <img
                            src={typeof formik.values.profilePicture === 'string'
                              ? formik.values.profilePicture
                              : URL.createObjectURL(formik.values.profilePicture)}
                            alt="Preview"
                            style={{ maxHeight: 80, maxWidth: '100%' }}
                          />
                        ) : (
                          <>
                            <i className="bi bi-cloud-upload" style={{ fontSize: 32 }} />
                            <span>Choose a file</span>
                          </>
                        )}
                        <input
                          id="profilePictureInput"
                          name="profilePicture"
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={e => {
                            if (e.target.files && e.target.files.length > 0) {
                              formik.setFieldValue('profilePicture', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="emailInput">Email <i className="bi bi-question-circle" /></label>
                    <Input
                      id="emailInput"
                      name="email"
                      type="email"
                      placeholder="e.g. johndoe@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="passwordInput">Password <i className="bi bi-question-circle" /></label>
                    <Input
                      id="passwordInput"
                      name="password"
                      type="password"
                      placeholder=""
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <small className="text-muted">Must have at least 8 characters</small>
                  </div>
                  {/* Country */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="countryInput">Country</label>
                    <Input
                      id="countryInput"
                      name="country"
                      placeholder="e.g. India"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {/* Mobile */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="mobileInput">Phone</label>
                    <Input
                      id="mobileInput"
                      name="mobile"
                      placeholder="e.g. +1234567890"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {/* Company Address */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="companyAddressInput">Company Address</label>
                    <textarea
                      id="companyAddressInput"
                      className="form-control"
                      name="companyAddress"
                      placeholder="e.g. 132, My Street, Kingston, New York 12401"
                      value={formik.values.companyAddress}
                      onChange={formik.handleChange}
                      rows={2}
                    />
                  </div>
                  {/* Gender */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="genderInput">Gender</label>
                    <Select
                      id="genderInput"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      ariaLabel={''}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                  {/* Language */}
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="languageInput">Change Language</label>
                    <Select
                      id="languageInput"
                      name="language"
                      value={formik.values.language}
                      onChange={formik.handleChange}
                      ariaLabel={''}
                    >
                      <option value="English">English</option>
                      {/* Add more languages as needed */}
                    </Select>
                  </div>
                  {/* Login Allowed */}
                  <div className="col-md-12 mt-2">
                    <label className="form-label mb-2">Login Allowed?</label>
                    <div>
                      <label className="me-3">
                        <input
                          type="radio"
                          name="loginAllowed"
                          value="Yes"
                          checked={formik.values.loginAllowed === 'Yes'}
                          onChange={formik.handleChange}
                        />{' '}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="loginAllowed"
                          value="No"
                          checked={formik.values.loginAllowed === 'No'}
                          onChange={formik.handleChange}
                        />{' '}
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 d-flex gap-2">
                  <Button color="primary" type="submit" icon="Check">
                    Save
                  </Button>
                  <Button color="light" type="button" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </ModalBody>
        </Modal>
    );
};

export default AddContactModal;