import React from "react";

type LeadDetails = {
    
  name: string;
  email: string;
  addedBy: string;
  leadOwner: string;
  companyName?: string;
  mobile?: string;
 website?:string;
 officephonenumber?:string;
 country?:string;
 state?:string;
 city?:string;
 postalcode?:string;
 Address?:string;

};

type Props = {
  lead: LeadDetails;
};

const ProfileTab: React.FC<Props> = ({ lead }) => (
<div className="mt-6 bg-white p-6 rounded shadow">
  <h3 className="text-xl font-medium mb- m-4">Profile Info</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base text-gray-700">
    {[
      ["Name", lead.name || "--"],
      ["Email", lead.email || "--" ],
      ["Added By", lead.addedBy || "--"],
      ["Lead Owner", lead.leadOwner || "--"],
      ["Company", lead.companyName || "--"],
      ["Mobile", lead.mobile || "--"],
      ["Office Phone", lead.officephonenumber || "--"],
      ["Country", lead.country || "--"],
      ["State", lead.state || "--"],
      ["City", lead.city || "--"],
      ["Postal Code", lead.postalcode || "--"],
      ["Address", lead.Address || "--"],
    ].map(([label, value]) => (
      <div key={label} className="p-2 m-4 flex">
      
        <span className="min-w-[130px] font-semibold">{label} :</span>
        <span className="break-all">{value}</span>
      </div>
    ))}
  </div>
</div>


);

export default ProfileTab;
