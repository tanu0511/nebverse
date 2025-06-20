/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from "react";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../../../components/bootstrap/Modal";
import Input from "../../../components/bootstrap/forms/Input";
import Button from "../../../components/bootstrap/Button";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import { useFormik } from "formik";
import Select from "../../../components/bootstrap/forms/Select";
import ClientCategoryModal from "./ClientCategoryModal";
import ClientSubCategoryModal from "./ClientSubCategoryModal"

interface IAddClientModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddEmployee: (client: client) => void;
  selectedEmployee?: client;
}
interface client {
  status: string;
  salutation: string;
  name: string;
  email: string;
  country: string;
  mobile: string;
  createdAt: string;
  gender: string;
  language: string;
  clientCategory: string;
  clientSubCategory: string;
  loginAllowed: boolean;
  electronicAddress: string;
  electronicAddressScheme?: string;
  gstNumber?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  address?: string;
  companyName?: string;
  website?: string;
  taxName?: string;
  receiveEmailNotifications?: boolean;
  addedBy?: string;
  companyAddress?: string;
  shippingAddress?: string;
  note?: string;
  additionalField?: any; // Add this field
}

const AddClientModal: FC<IAddClientModalProps> = ({
  isOpen,
  setIsOpen,
  onAddEmployee,
  selectedEmployee,
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState<string[]>(
    selectedEmployee?.clientCategory
      ? [selectedEmployee.clientCategory]
      : ["Category 1", "Category 2"]
  );
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategories, setSubCategories] = useState<
    { name: string; category: string }[]
  >([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: selectedEmployee?.status || "Active",
      salutation: selectedEmployee?.salutation || "",
      name: selectedEmployee?.name || "",
      email: selectedEmployee?.email || "",
      profilePicture: null,
      country: selectedEmployee?.country || "",
      mobile: selectedEmployee?.mobile || "",
      createdAt:
        selectedEmployee?.createdAt || new Date().toISOString().split("T")[0],
      gender: selectedEmployee?.gender || "",
      language: selectedEmployee?.language || "English",
      clientCategory: selectedEmployee?.clientCategory || "",
      clientSubCategory: selectedEmployee?.clientSubCategory || "",
      loginAllowed: selectedEmployee?.loginAllowed || "Yes",
      electronicAddress: selectedEmployee?.electronicAddress || "",
      gstNumber: selectedEmployee?.gstNumber || "",
      address: selectedEmployee?.address || "",
      city: selectedEmployee?.city || "",
      phoneNumber: selectedEmployee?.phoneNumber || "",
      state: selectedEmployee?.state || "Yes",
      postalCode: selectedEmployee?.postalCode || "",
      companyName: selectedEmployee?.companyName || "",
      website: selectedEmployee?.website || "",
      taxName: selectedEmployee?.taxName || "",
      receiveEmailNotifications:
        selectedEmployee?.receiveEmailNotifications || "",
      addedBy: selectedEmployee?.addedBy || "",
      companyAddress: selectedEmployee?.companyAddress || "",
      shippingAddress: selectedEmployee?.shippingAddress || "",
      note: selectedEmployee?.note || "",
      additionalField: selectedEmployee?.additionalField || "",
      electronicAddressScheme: selectedEmployee?.electronicAddressScheme || "",
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
      onAddEmployee(values as client);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      isStaticBackdrop={true}
      aria-hidden={false}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="edit-client-title">Add Client</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {/* Personal Details Section */}

        <div className="row g-3">
          <div className="col-md-4">
            <FormGroup id="salutation" label="Salutation">
              <select
                className="form-select"
                value={formik.values.salutation}
                onChange={formik.handleChange}
              >
                <option>--</option>
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="name" label="Name *">
              <Input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter client name"
                required
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="email" label="Email">
              <Input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="e.g. johndoe@example.com"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-2">
          <div className="col-md-4">
            <FormGroup id="profilePicture" label="Profile Picture">
              <Input type="file" />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="country" label="Country">
              <select
                className="form-select"
                value={formik.values.country}
                onChange={formik.handleChange}
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="mobile" label="Mobile">
              <Input
                type="text"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                placeholder="e.g. 1234567890"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <FormGroup id="gender" label="Gender">
              <select
                className="form-select"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="language" label="Change Language">
              <select
                className="form-select"
                value={formik.values.language}
                onChange={formik.handleChange}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="clientCategory" label="Client Category">
              <div className="input-group">
                <select
                  className="form-select"
                  value={formik.values.clientCategory}
                  onChange={formik.handleChange}
                  name="clientCategory"
                >
                  <option>--</option>
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowCategoryModal(true)}
                >
                  Add
                </button>
              </div>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="clientSubCategory" label="Client Sub Category">
              <div className="input-group">
                <select
                  className="form-select"
                  value={formik.values.clientSubCategory}
                  onChange={formik.handleChange}
                  name="clientSubCategory"
                >
                  <option>--</option>
                  {subCategories
                    .filter((sc) => sc.category === formik.values.clientCategory)
                    .map((sc) => (
                      <option key={sc.name}>{sc.name}</option>
                    ))}
                </select>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowSubCategoryModal(true)}
                >
                  Add
                </button>
              </div>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Login Allowed?">
              <Select
                name="loginAllowed"
                onChange={formik.handleChange}
                value={
                  formik.values.loginAllowed
                    ? String(formik.values.loginAllowed)
                    : ""
                }
                ariaLabel="Login Allowed"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Login Allowed?">
              <Select
                name="loginAllowed"
                onChange={formik.handleChange}
                value={
                  formik.values.loginAllowed
                    ? String(formik.values.loginAllowed)
                    : ""
                }
                ariaLabel="Login Allowed"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormGroup>
          </div>
        </div>

        {/* Company Details Section */}
        <h5 className="mt-4">Company Details</h5>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <FormGroup id="companyName" label="Company Name">
              <Input
                type="text"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                placeholder="e.g. Acme Corporation"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="website" label="Official Website">
              <Input
                type="text"
                value={formik.values.website}
                onChange={formik.handleChange}
                placeholder="e.g. https://www.example.com"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="taxName" label="Tax Name">
              <Input
                type="text"
                value={formik.values.taxName}
                onChange={formik.handleChange}
                placeholder="e.g. GST/VAT"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <FormGroup id="gstNumber" label="GST/VAT Number">
              <Input
                type="text"
                value={formik.values.gstNumber}
                onChange={formik.handleChange}
                placeholder="e.g. 18AABCU960XXXXX"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="phoneNumber" label="Office Phone Number">
              <Input
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                placeholder="e.g. 1234567890"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="city" label="City">
              <Input
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                placeholder="e.g. New York"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <FormGroup id="state" label="State">
              <Input
                type="text"
                value={formik.values.state}
                onChange={formik.handleChange}
                placeholder="e.g. California"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="postalCode" label="Postal Code">
              <Input
                type="text"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                placeholder="e.g. 123456"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="addedBy" label="Added By">
              <Select
                name="addedBy"
                value={formik.values.addedBy}
                onChange={formik.handleChange}
                ariaLabel="Added By"
              >
                <option value="">--</option>
                <option value="Nisha">Nisha</option>
                <option value="ayushi">ayushi</option>
                <option value="john">john</option>
                <option value="TANUSHREE WAGHMARE">TANUSHREE WAGHMARE</option>
              </Select>
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <FormGroup id="companyAddress" label="Company Address">
              <textarea
                className="form-control"
                value={formik.values.companyAddress}
                onChange={formik.handleChange}
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                rows={3}
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="shippingAddress" label="Shipping Address">
              <textarea
                className="form-control"
                value={formik.values.shippingAddress}
                onChange={formik.handleChange}
                placeholder="e.g. 132, My Street, Kingston, New York 12401"
                rows={3}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-12">
            <FormGroup id="note" label="Note">
              <textarea
                className="form-control"
                value={formik.values.note}
                onChange={formik.handleChange}
                placeholder="Add any notes here..."
                rows={5}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <FormGroup id="companyLogo" label="Company Logo">
              <Input type="file" onChange={formik.handleChange} />
            </FormGroup>
          </div>
        </div>

        {/* E-Invoice Settings */}
        <h5 className="mt-4">E-Invoice Settings</h5>
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <FormGroup id="electronicAddress" label="Electronic Address">
              <Input
                type="text"
                value={formik.values.electronicAddress}
                onChange={formik.handleChange}
                placeholder="e.g. Electronic Address"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup
              id="electronicAddressScheme"
              label="Electronic Address Scheme"
            >
              <Input
                type="text"
                value={formik.values.electronicAddressScheme}
                onChange={formik.handleChange}
                placeholder="e.g. Electronic Address Scheme"
              />
            </FormGroup>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="light" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button color="primary" onClick={formik.handleSubmit}>
          Save
        </Button>
      </ModalFooter>

      {/* Render the ClientCategoryModal OUTSIDE the ModalBody */}
      <ClientCategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={categories}
        setCategories={setCategories}
      />
      <ClientSubCategoryModal
        show={showSubCategoryModal}
        onClose={() => setShowSubCategoryModal(false)}
        categories={categories}
        subCategories={subCategories}
        setSubCategories={setSubCategories}
      />
    </Modal>
  );
};

export default AddClientModal;