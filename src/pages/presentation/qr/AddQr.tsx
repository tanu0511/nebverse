/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// @ts-ignore


import { QRCodeCanvas } from 'qrcode.react';
import 'react-phone-input-2/lib/style.css'


export const qrTypes = ["text", "email", "event", "location", "paypal", "skype", "sms", "phone", "upi", "url", "wifi", "zoom", "whatsapp",]; // yahan apne sare types daal do


type QRData = {
	text?: string;
	url?: string;
	email?: string;
	subject?: string;
	body?: string;
	phone?: string;
	ssid?: string;
	password?: string;
};

// Add QRCodeData type (same as DashboardPage)
type QRCodeData = {
	id: string;
	code: string;
	title: string;
	type: string;
	created: string;
};

// Add prop type
interface SummaryPageProps {
	onSave?: (data: QRCodeData) => void;
}

// Update function signature
const AddQr: React.FC<SummaryPageProps> = () => {
	const [type, setType] = useState('text');
	const [data, setData] = useState<QRData>({});
	const [qrValue, setQrValue] = useState('');

	const [startDate, setStartDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endDate, setEndDate] = useState('');
	const [endTime, setEndTime] = useState('');
	const [reminder, setReminder] = useState('');
	const [eventLink, setEventLink] = useState('');
	const [note, setNote] = useState('');
	const [eventTitle, setEventTitle] = useState('');
	const [eventLocation, setEventLocation] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const [wifiType, setWifiType] = useState('nopass');
	const [wifiHidden, setWifiHidden] = useState(false);

	const [logoSize, setLogoSize] = useState(100); // Add this with your other useState hooks
	const [qrType, setQrType] = useState("");


	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setData(prev => ({ ...prev, [name]: value }));
	};




	const [code, setCode] = useState('');
	const [title, setTitle] = useState('');
	const [created, setCreated] = useState('');


	const handleGenerate = () => {
		let value = '';
		switch (type) {
			case 'text':
				value = data.text || '';
				break;
			case 'url':
				value = data.url || '';
				break;
			case 'email':
				value = `mailto:${data.email}?subject=${data.subject || ''}&body=${data.body || ''}`;
				break;
			case 'phone':
				value = `tel:${data.phone}`;
				break;
			case 'sms':
				value = `sms:${data.phone}?body=${data.body}`;
				break;
			case 'wifi':
				value = `WIFI:T:WPA;S:${data.ssid};P:${data.password};;`;
				break;
			default:
				value = '';
		}
		if (!value) {
			alert("Please fill all required fields for this QR type.");
			return;
		}
		setQrValue(value);
	};





	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

			<label className="block mb-2">Select Type:</label>
			<select name="type" value={type} onChange={e => setType(e.target.value)} className="mb-4 p-2 border w-full">
				<option value="text">Text</option>
				<option value="email">Email</option>
				<option value="event">Event</option>
				<option value="location">Location</option>
				<option value="paypal">PayPal</option>
				<option value="skype">Skype</option>
				<option value="sms">SMS</option>
				<option value="phone">Phone</option> {/* yahan value="phone" hona chahiye */}
				<option value="upi">UPI</option>
				<option value="url">URL</option>
				<option value="wifi">WiFi</option>
				<option value="zoom">Zoom</option>
				<option value="whatsapp">WhatsApp</option>



			</select>

			{/* Dynamic Fields */}
			{type === "event" && (
				<div className="border rounded p-3 mt-3 bg-light">
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">
								Event Title <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								className="form-control"
								value={eventTitle}
								onChange={e => setEventTitle(e.target.value)}
								placeholder="Event Title"
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Location</label>
							<input
								type="text"
								className="form-control"
								value={eventLocation}
								onChange={e => setEventLocation(e.target.value)}
								placeholder="Location"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-md-3">
							<label className="form-label">
								Starts On Date <span className="text-danger">*</span>
							</label>
							<input
								type="date"
								className="form-control"
								value={startDate}
								onChange={e => setStartDate(e.target.value)}
							/>
						</div>
						<div className="col-md-3">
							<label className="form-label">
								Starts On Time <span className="text-danger">*</span>
							</label>
							<input
								type="time"
								className="form-control"
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
							/>
						</div>
						<div className="col-md-3">
							<label className="form-label">
								Ends On Date <span className="text-danger">*</span>
							</label>
							<input
								type="date"
								className="form-control"
								value={endDate}
								onChange={e => setEndDate(e.target.value)}
							/>
						</div>
						<div className="col-md-3">
							<label className="form-label">
								Ends On Time <span className="text-danger">*</span>
							</label>
							<input
								type="time"
								className="form-control"
								value={endTime}
								onChange={e => setEndTime(e.target.value)}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Reminder before event</label>
							<input
								type="text"
								className="form-control"
								value={reminder}
								onChange={e => setReminder(e.target.value)}
								placeholder="e.g. 10 minutes"
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Link</label>
							<input
								type="url"
								className="form-control"
								value={eventLink}
								onChange={e => setEventLink(e.target.value)}
								placeholder="Event Link"
							/>
						</div>
					</div>
					<div className="mb-3">
						<label className="form-label">Note</label>
						<textarea
							className="form-control"
							rows={2}
							value={note}
							onChange={e => setNote(e.target.value)}
							placeholder="Note"
						/>
					</div>
				</div>
			)}

			{type === 'text' && (
				<input name="text" onChange={handleChange} placeholder="Enter text" className="mb-2 p-2 border w-full" />
			)}
			{type === 'url' && (
				<input name="url" onChange={handleChange} placeholder="https://example.com" className="mb-2 p-2 border w-full" />
			)}
			{type === 'email' && (
				<>
					<input name="email" onChange={handleChange} placeholder="example@example.com" className="mb-2 p-2 border w-full"/>
					<input name="subject" onChange={handleChange} placeholder="Subject" className="mb-2 p-2 border w-full" />
					<input name="body" onChange={handleChange} placeholder="Body" className="mb-2 p-2 border w-full" />
				</>
			)}
			{type === 'phone' && (
				<input name="phone" onChange={handleChange} placeholder="Enter phone number" className="mb-2 p-2 border w-full"/>
			)}
			{type === 'sms' && (
				<>
					<input name="phone" onChange={handleChange} placeholder="Phone Number" className="mb-2 p-2 border w-full" />
					<input name="body" onChange={handleChange} placeholder="Message" className="mb-2 p-2 border w-full" />
				</>
			)}
			{type === 'wifi' && (
				<>
					<input name="ssid" onChange={handleChange} placeholder="WiFi SSID" className="mb-2 p-2 border w-full" />
					<input name="password" onChange={handleChange} placeholder="Password" className="mb-2 p-2 border w-full" />
				</>
			)}

			<button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
				Generate QR Preview
			</button>

			{qrValue && (
				<div className="mt-4 p-4 border rounded text-center">
					<QRCodeCanvas value={qrValue} size={200} />
					<p className="mt-2 break-all text-sm">{qrValue}</p>
				</div>
			)}
		</div>
	);
};

export { AddQr };




interface SummaryPageProps {
	onSave?: (data: QRCodeData) => void;
}


export default AddQr;

