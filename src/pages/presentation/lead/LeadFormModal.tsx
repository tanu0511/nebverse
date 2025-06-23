// /* eslint-disable react/self-closing-comp */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/jsx-key */
// import React, { useState } from "react";
// import Button from "../../../components/bootstrap/Button";
// import Modal, { ModalBody } from '../../../components/bootstrap/Modal';
// import Icon from "../../../components/icon/Icon";
// import LeadPreviewForm from "./LeadPreviewForm";
// // Add this import at the top if you use react-icons

// export type LeadFormModalProps = {
//   show: boolean;
//   onHide: () => void;
//   types: { id: number; name: string }[];
//   priorities: string[];
//   groups: { id: number; name: string }[];
//   onSave: (ticket: any) => void;
// };

// const fieldList = [
//   { label: "Name", toggle: false },
//   { label: "Email", toggle: true },
//   { label: "Company Name", toggle: true },
//   { label: "Website", toggle: true },
//   { label: "Address", toggle: true },
//   { label: "Mobile", toggle: true },
//   { label: "Message", toggle: true },
//   { label: "City", toggle: true },
//   { label: "State", toggle: true },
//   { label: "Country", toggle: true },
//   { label: "Postal Code", toggle: true },
//   { label: "Source", toggle: true },
//   { label: "Product", toggle: true },
// ];

// const LeadFormModal: React.FC<LeadFormModalProps> = ({
//   show,
//   onHide,
//   types,
//   priorities,
//   groups,
//   onSave,
// }) => {
//   // One toggle state per field (except Name)
//   const [toggles, setToggles] = useState(
//     fieldList.map((f) => (f.toggle ? true : false))
//   );

//   const handleToggle = (idx: number) => {
//     setToggles((prev) =>
//       prev.map((val, i) => (i === idx ? !val : val))
//     );
//   };

//   // Form state
//   const [form, setForm] = useState({
//     email: "",
//     name: "",
//     subject: "",
//     description: "",
//     type: "",
//     priority: "",
//     group: "",
//   });


//   return (
//     <Modal
//       isOpen={show}
//       setIsOpen={onHide}
//       size="xl"
//       title={null}
//       isStaticBackdrop
//     >
//       <ModalBody>
//         <div>
//           <div className="container-fluid py-4">
//               <div
//                 style={{ position: "absolute", top: 20, right: 30, zIndex: 10 }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-link p-0"
//                   style={{ fontSize: 24, color: "#888" }}
//                   onClick={onHide}
//                   aria-label="Close"
//                 >
//                   <Icon icon="close" />
//                 </button>
//               </div>
//               <div className="row">
//                 {/* Fields Table with toggles */}
//                 <div className="col-md-6">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Field</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {fieldList.map((field, idx) => (
//                         <tr key={field.label}>
//                           <td>{idx + 1}</td>
//                           <td>{field.label}</td>
//                           <td>
//                             {field.toggle ? (
//                               <div className="form-check form-switch">
//                                 <input
//                                   type="checkbox"
//                                   className="form-check-input"
//                                   checked={toggles[idx]}
//                                   onChange={() => handleToggle(idx)}
//                                   id={toggle-${idx}}
//                                 />
//                                 <label
//                                   className="form-check-label visually-hidden"
//                                   htmlFor={toggle-${idx}}
//                                 >
//                                   Toggle {field.label}
//                                 </label>
//                               </div>
//                             ) : (
//                               "--"
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="col-md-12 mt-4">
//                     <div className="card p-3 mb-4">
//                       <div className="mb-2 fw-bold">
//                         Copy &amp; Paste the code anywhere in your site to show
//                         the form,
//                         <br />
//                         additionally you can adjust the width and height px to fit
//                         your website.
//                       </div>
//                       <pre
//                         style={{
//                           background: "#fff0f0",
//                           padding: 10,
//                           borderRadius: 6,
//                           fontSize: 14,
//                         }}
//                       >
//                         {<iframe src="https://nebverse.com/public/lead-form/40e0f6ff11e87832a089641b4ba953f2" frameborder="0" scrolling="yes" style="display:block; width:100%; height:60vh;"></iframe>}
//                       </pre>
//                       <div className="mt-3 fw-bold">Share Direct link</div>
//                       <div>
//                         <a
//                           href="https://nebverse.com/public/lead-form/40e0f6ff11e87832a089641b4ba953f2?styled=1"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           https://nebverse.com/public/lead-form/40e0f6ff11e87832a089641b4ba953f2?styled=1
//                         </a>
//                         <br />
//                         <a
//                           href="https://nebverse.com/public/lead-form/40e0f6ff11e87832a089641b4ba953f2?styled=1&with_logo=1"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           https://nebverse.com/public/lead-form/40e0f6ff11e87832a089641b4ba953f2?styled=1&with_logo=1
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <LeadPreviewForm
//                     showEmail={toggles[1]} 
//                     showCompanyName={toggles[2]}
//                     showWebsite={toggles[3]} 
//                   />
//                 </div>
//                 {/* Preview Form */}
//               </div>
//             </div>
//             <div className="row"></div>
//             <div className="row"></div>
//           </div>
//         </ModalBody>
//     </Modal>
//   );
// };
// export default LeadFormModal;