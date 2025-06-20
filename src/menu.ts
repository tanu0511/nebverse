/* eslint-disable @typescript-eslint/no-unused-vars */
import qrcode from "qrcode.react";
import { Dashboard } from "./components/icon/material-icons";

export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		// subMenu: {
		// 	// privatedashboard: {
		// 	// 	id: 'privatedashboard',
		// 	// 	text: 'Private Dashboard',
		// 	// 	path: '/private-dashboard',
		// 	// },
		// 	advanceddashboard: {
		// 		id: 'advanceddashboard',
		// 		text: 'Advanced Dashboard',
		// 		path: '/',
		// 	},
		// },
	},
	leads: {
		id: 'leads',
		text: 'Leads',
		path: '/leads',
		icon: 'FolderShared',
		subMenu: {
			leadContact: {
				id: 'leadContact',
				text: 'Lead Contact',
				path: '/leads/lead-contact',
			},
			deals: {
				id: 'deals',
				text: 'Deals',
				path: '/leads/deals',
			},
		
		},
	},
	Client:{
		id:'client',
		text:'Client',
		icon: 'Business',
	    path:'/client'
	},
	hr: {
		id: 'hr',
		text: 'HR',
		path: 'hr-dashboard',
		icon: 'PeopleAlt',
		subMenu: {
			employees: {
				id: 'employees',
				text: 'Employees',
				path: 'hr/employees',
			},
			leaves: {
				id: 'leaves',
				text: 'Leaves',
				path: 'hr/leaves',
			},
			attendance: {
				id: 'attendance',
				text: 'Attendance',
				path: 'hr/attendance',
			},
			holiday: {
				id: 'holiday',
				text: 'Holiday',
				path: 'hr/holiday',
			},
			designation: {
				id: 'designation',
				text: 'Designation',
				path: 'hr/designation',
			},
			department: {
				id: 'department',
				text: 'Department',
				path: 'hr/department',
			},
			appreciation: {
				id: 'appreciation',
				text: 'Appreciation',
				path: 'hr/appreciation',
			},
			shiftroaster: {
				id: 'shift-roaster',
				text: 'Shift Roaster',
				path: 'hr/shiftroaster',
			},
		},
	},
	Finance: {
		id: 'Finance',
		text: 'Finance',
		path: 'Finance-dashboard',
		icon: 'AttachMoney',
		subMenu: {
			Proposal: {
				id: 'Proposal',
				text: 'Proposal',
				path: 'Finance/Proposal',
			},
			Estimates: {
				id: 'Estimates',
				text: 'Estimates',
				path: 'Finance/Estimates',
			},
			Invoices: {
				id: 'Invoices',
				text: 'Invoices',
				path: 'Finance/Invoices',
			},
			Payments: {
				id: 'Payments',
				text: 'Payments',
				path: 'Finance/Payments',
			},
			CreditNote: {
				id: 'CreditNote',
				text: 'Credit Note',
				path: 'Finance/CreditNote',
			},
			Expenses: {
				id: 'Expenses',
				text: 'Expenses',
				path: 'Finance/Expenses',
			},
			BankAccount: {
				id: 'BankAccount',
				text: 'Bank Account',
				path: 'Finance/BankAccount',
			},
			EInvoice: {
				id: 'EInvoice',
				text: 'E-Invoice',
				path: 'Finance/EInvoice',
			},
		},
	},
	Noticeboard: {
		id: 'Noticeboard',
		text: 'Noticeboard',
		path: 'NoticeBoard/NoticeBoard',
		icon: 'CalendarToday',
	},
	KnowledgeBase:{
		id: 'KnowledgeBase',
		text: 'Knowledge Base',
	    icon:'Bookmarks',
		path: 'KnowledgeBase/KnowledgeBase',
	},
	message: {
		id: 'message',
		text: 'Message',
		path: '/message',
		icon: 'Message',
		subMenu: null,
	},
	Assets: {
       id: 'assets',
	   text: 'Assets',
	   icon:'Computer',
	   path:'/assets'
	   
	},
	
	Payroll: {
		id: 'Payroll',
		text: 'Payroll',
		path: 'payroll-dashboard',
		icon: 'Payment',
		subMenu: {
			Payroll: {
				id: 'Payroll',
				text: 'Payroll',
				path: 'payroll/Payroll',
			},
			EmployeeSalary: {
				id: 'EmployeeSalary',
				text: 'Employee Salary',
				path: 'payroll/employeeSalary',
			},
			PayrollExpenses: {
				id: 'PayrollExpenses',
				text: 'Payroll Expenses',
				path: 'payroll/PayrollExpenses',
			},
			OvertimeRequest: {
				id: 'OvertimeRequest',
				text: 'Overtime Request',
				path: 'payroll/overtimeRequest',
			},
			Reports: {
				id: 'Reports',
				text: 'Reports',
				path: 'payroll/reports',
			},
		},
	},
	Work: {
		id: 'Work',
		text: 'Work',
		path: 'work',
		icon: 'Work',
		subMenu: {
			Task: {
				id: 'Task',
				text: 'Task',
				path: 'work/task',
			},
			Project: {
				id: 'Project',
				text: 'project',
				path: 'work/project',
			},
			Contract: {
				id: 'Contract',
				text: 'Contract',
				path: 'work/contract',
			},
			Timesheet: {
				id: 'Timesheet',
				text: 'Timesheet',
				path: 'work/timesheet',
			},
			ProjectRoadmap: {
				id: 'Project-Roadmap',
				text: 'Project Roadmap',
				path: 'work/Project-Roadmap',
			},
		},
	},
	Letter:{
         id:'letter',
		 text:'Letter',
		 path:'letter',
		 icon:'LocalPostOffice',
		 subMenu:{
			Generate:{
				id:'Generate',
				text:'Generate',
				path:'letter/generate'

			},
			Template:{
				id:'Template',
				text: 'Template',
				path:'letter/template'
			}
		 }
	},
	Recruit:{
       id:'recruit',
	   text:'Recruit',
	   path:'recruit',
	   icon:'AssignmentInd',
	   subMenu:{
		Dashboard:{
			id:'Dashboard',
			text:'Dashboard',
			path:'recruit/dashboard'
		},
	   
	   Jobs:{
		id:'Jobs',
		text:'Jobs',
		path:'recruit/jobs'
	   },
	   JobApplication:{
		id:'JobApplication',
		text:'Job Application',
		path: 'recruit/job-application'
	   },
	   InterviewSchedule:{
		id:'InterviewSchedule',
		text:'Interview Schedule',
		path:'recruit/interview-schedule'
	   },
	   OfferLetters:{
		id:'OfferLetters',
		text:'Offer Letters',
		path:'recruit/offerletters'
	   },
	   Skills:{
		id:'Skills',
		text:'Skills',
		path:'recruit/skills'
	   },
	   CandidateDatabase:{
		id:'CandidateDatabase',
		text:'Candidate Database',
		path:'recruit/candidate-database'
	   },
	   Reports:{
		id:'Reports',
		text:'Reports',
		path:'recruit/reports'
	   },
	   CareerSite:{
		id:'CareerSite',
		text:'Career Site',
		path: 'recruit/career-site'
	   }
	   },
	},
	Purchase: {
		id: 'Purchase',
		text: 'Purchase',
		path: 'purchase',
		icon: 'ShoppingCart',
		subMenu: {
			Vendor: {
				id: 'Vendor',
				text: 'Vendor',
				path: 'purchase/vendor',
			},
			Products: {
				id: 'Products',
				text: 'Products',
				path: 'purchase/products',
			},
			Purchase_Order: {
				id: 'Purchase_Order',
				text: 'Purchase Order',
				path: 'purchase/purchase-order',
			},
			Bills: {
				id: 'Bills',
				text: 'Bills',
				path: 'purchase/bills',
			},
			Vendor_Payments: {
				id: 'Vendor_Payments',
				text: 'Vendor Payments',
				path: 'purchase/vendor-payments',
			},
			Vendor_Credits: {
				id: 'Vendor_Credits',
				text: 'Vendor Credits',
				path: 'purchase/vendor-credits',
			},
			Inventory: {
				id: 'Inventory',
				text: 'Inventory',
				path: 'purchase/inventory',
			},
			Reports: {
				id: 'Reports',
				text: 'Reports',
				path: 'purchase/reports',
			},
		},
	},
	Ticket:{
     		id: 'ticket',
		text: 'Ticket',
		path: 'ticket',
		icon:'HeadsetMic'
	},
	
	Order: {
		id: 'order',
		text: 'Order',
		path: '/order',
		icon: 'ShoppingBag',
		subMenu: null,
	},
	QrCode:{
      id:'qrCode',
	  text:'QR Code',
	  path:'/qr-code',
	  icon:'QrCode',
	  subMenu:null
	},
	Event:{
		id:'event',
		text:'Event',
		path:'/event',
		icon:'EventNote',
		subMenu:null,
	},
	
};

export const demoPagesMenu = {
	pages: {
		id: 'pages',
		text: 'Pages',
		icon: 'Extension',
	},
	listPages: {
		id: 'listPages',
		text: 'List Pages',
		path: 'list-pages',
		icon: 'Dvr',
		subMenu: {
			listBoxed: {
				id: 'listBoxed',
				text: 'Boxed List',
				path: 'list-pages/boxed-list',
				icon: 'ViewArray',
			},
			listFluid: {
				id: 'listFluid',
				text: 'Fluid List',
				path: 'list-pages/fluid-list',
				icon: 'ViewDay',
			},
		},
	},
	gridPages: {
		id: 'gridPages',
		text: 'Grid Pages',
		path: 'grid-pages',
		icon: 'Window',
		subMenu: {
			gridBoxed: {
				id: 'gridBoxed',
				text: 'Boxed Grid',
				path: 'grid-pages/boxed',
				icon: 'ViewArray',
			},
			gridFluid: {
				id: 'gridFluid',
				text: 'Fluid Grid',
				path: 'grid-pages/fluid',
				icon: 'ViewDay',
			},
		},
	},
	editPages: {
		id: 'editPages',
		text: 'Edit Pages',
		path: 'edit-pages',
		icon: 'drive_file_rename_outline ',
		subMenu: {
			editModern: {
				id: 'editModern',
				text: 'Modern Edit',
				path: 'edit-pages/modern',
				icon: 'AutoAwesomeMosaic',
				notification: 'primary',
			},
			editBoxed: {
				id: 'editBoxed',
				text: 'Boxed Edit',
				path: 'edit-pages/boxed',
				icon: 'ViewArray',
			},
			editFluid: {
				id: 'editFluid',
				text: 'Fluid Edit',
				path: 'edit-pages/fluid',
				icon: 'ViewDay',
			},
			editWizard: {
				id: 'editWizard',
				text: 'Wizard Edit',
				path: 'edit-pages/wizard',
				icon: 'LinearScale',
			},
			editInCanvas: {
				id: 'editInCanvas',
				text: 'In Canvas Edit',
				path: 'edit-pages/in-canvas',
				icon: 'VerticalSplit',
			},
			editInModal: {
				id: 'editInModal',
				text: 'In Modal Edit',
				path: 'edit-pages/in-modal',
				icon: 'PictureInPicture',
			},
		},
	},
	singlePages: {
		id: 'singlePages',
		text: 'Single Pages',
		path: 'single-pages',
		icon: 'Article',
		subMenu: {
			boxedSingle: {
				id: 'boxedSingle',
				text: 'Boxed',
				path: 'single-pages/boxed',
				icon: 'ViewArray',
			},
			fluidSingle: {
				id: 'fluidSingle',
				text: 'Fluid',
				path: 'single-pages/fluid',
				icon: 'ViewDay',
			},
		},
	},
	pricingTable: {
		id: 'pricingTable',
		text: 'Pricing Table',
		path: 'pricing-table',
		icon: 'Local Offer',
	},

	app: {
		id: 'app',
		text: 'Apps',
		icon: 'Extension',
	},
	projectManagement: {
		id: 'projectManagement',
		text: 'Project Management',
		path: 'project-management',
		icon: 'AutoStories',
		subMenu: {
			list: {
				id: 'list',
				text: 'Projects',
				path: 'project-management/list',
				icon: 'AutoStories',
			},
			itemID: {
				id: 'projectID',
				text: 'projectID',
				path: 'project-management/project',
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Project',
				path: 'project-management/project/1',
				icon: 'Book',
			},
		},
	},
	knowledge: {
		id: 'knowledge',
		text: 'Knowledge',
		path: 'knowledge',
		icon: 'AutoStories',
		subMenu: {
			grid: {
				id: 'grid',
				text: 'Knowledge Grid',
				path: 'knowledge/grid',
				icon: 'AutoStories',
			},
			itemID: {
				id: 'itemID',
				text: 'itemID',
				path: 'knowledge/item',
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Item',
				path: 'knowledge/item/1',
				icon: 'Book',
			},
		},
	},
	sales: {
		id: 'sales',
		text: 'Sales',
		path: 'sales',
		icon: 'Store',
		subMenu: {
			dashboard: dashboardPagesMenu.dashboard,
			salesList: {
				id: 'products',
				text: 'Sales List',
				path: 'sales/sales-list',
				icon: 'FactCheck',
			},
			productsGrid: {
				id: 'productsGrid',
				text: 'Products Grid',
				path: 'sales/grid',
				icon: 'CalendarViewMonth',
			},
			productID: {
				id: 'productID',
				text: 'productID',
				path: 'sales/product',
				hide: true,
			},
			product: {
				id: 'product',
				text: 'Product',
				path: 'sales/product/1',
				icon: 'QrCode2',
			},
			transactions: {
				id: 'transactions',
				text: 'Transactions',
				path: 'sales/transactions',
				icon: 'PublishedWithChanges',
			},
		},
	},
	appointment: {
		id: 'appointment',
		text: 'Appointment',
		path: 'appointment',
		icon: 'Today',
		subMenu: {
			calendar: {
				id: 'calendar',
				text: 'Calendar',
				path: 'appointment/calendar',
				icon: 'EditCalendar',
				notification: true,
			},
			employeeList: {
				id: 'employeeList',
				text: 'Employee List',
				path: 'appointment/employee-list',
				icon: 'PersonSearch',
			},
			employeeID: {
				id: 'employeeID',
				text: 'employeeID',
				path: 'appointment/employee',
				hide: true,
			},
			employee: {
				id: 'employee',
				text: 'Employee',
				path: 'appointment/employee/1',
				icon: 'QrCode2',
			},
			appointmentList: {
				id: 'appointmentList',
				text: 'Appointment List',
				path: 'appointment/appointment-list',
				icon: 'Event',
			},
		},
	},
	crm: {
		id: 'crm',
		text: 'CRM',
		path: 'crm',
		icon: 'Contacts',
		subMenu: {
			dashboard: {
				id: 'dashboard',
				text: 'CRM Dashboard',
				path: 'crm/dashboard',
				icon: 'RecentActors',
			},
			customersList: {
				id: 'customersList',
				text: 'Customers',
				path: 'crm/customers',
				icon: 'PersonSearch',
			},
			customerID: {
				id: 'customerID',
				text: 'customerID',
				path: 'crm/customer',
				hide: true,
			},
			customer: {
				id: 'customer',
				text: 'Customer',
				path: 'crm/customer/1',
				icon: 'Badge',
			},
			// sales: {
			// 	id: 'sales',
			// 	text: 'Sales',
			// 	path: 'crm/sales',
			// 	icon: 'Storefront',
			// },
			// invoiceID: {
			// 	id: 'invoiceID',
			// 	text: 'invoiceID',
			// 	path: 'crm/invoice',
			// 	hide: true,
			// },
			// invoice: {
			// 	id: 'invoice',
			// 	text: 'Invoice',
			// 	path: 'crm/invoice/1',
			// 	icon: 'Receipt',
			// },
		},
	},
	chat: {
		id: 'chat',
		text: 'Chat',
		path: 'chat',
		icon: 'Forum',
		subMenu: {
			withListChat: {
				id: 'withListChat',
				text: 'With List',
				path: 'chat/with-list',
				icon: 'Quickreply',
			},
			onlyListChat: {
				id: 'onlyListChat',
				text: 'Only List',
				path: 'chat/only-list',
				icon: 'Dns',
			},
		},
	},

	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth-pages/login',
		icon: 'Login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: 'auth-pages/sign-up',
		icon: 'PersonAdd',
	},
	page404: {
		id: 'Page404',
		text: '404 Page',
		path: 'auth-pages/404',
		icon: 'ReportGmailerrorred',
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: 'page-layouts/blank',
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: 'aside-types',
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: 'aside-types/default-aside',
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: 'aside-types/minimize-aside',
				icon: 'View Compact',
			},
		},
	},
};

export const gettingStartedPagesMenu = {
	gettingStarted: {
		id: 'gettingStarted',
		text: 'Getting Started',
		path: 'getting-started',
		icon: 'Book',
		subMenu: {
			installation: {
				id: 'installation',
				text: 'Installation',
				path: 'getting-started/installation',
				icon: 'BuildCircle',
			},
			dev: {
				id: 'dev',
				text: 'Development',
				path: 'getting-started/development',
				icon: 'DirectionsRun',
			},
			folderStructure: {
				id: 'folderStructure',
				text: 'Folder Structure',
				path: 'getting-started/folder-structure',
				icon: 'SnippetFolder',
			},
			bootstrapVariables: {
				id: 'bootstrapVariables',
				text: 'Bootstrap Variables',
				path: 'getting-started/bootstrap-variables',
				icon: 'SnippetFolder',
			},
			projectStructure: {
				id: 'projectStructure',
				text: 'Project Structure',
				path: 'getting-started/project-structure',
				icon: 'SnippetFolder',
			},
		},
	},
	routes: {
		id: 'routes',
		text: 'Routes & Pages',
		path: 'routes',
		icon: 'AltRoute',
		subMenu: {
			router: {
				id: 'router',
				text: 'Router',
				path: 'routes/router',
				icon: 'Router',
			},
		},
	},
};

export const componentPagesMenu = {
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap',
		icon: 'Extension',
	},
	components: {
		id: 'components',
		text: 'Component',
		path: 'components',
		icon: 'Extension',
		notification: 'success',
		subMenu: {
			accordion: {
				id: 'accordion',
				text: 'Accordion',
				path: 'components/accordion',
				icon: 'ViewDay',
			},
			alert: {
				id: 'alert',
				text: 'Alert',
				path: 'components/alert',
				icon: 'Announcement',
			},
			badge: {
				id: 'badge',
				text: 'Badge',
				path: 'components/badge',
				icon: 'Vibration',
			},
			breadcrumb: {
				id: 'breadcrumb',
				text: 'Breadcrumb',
				path: 'components/breadcrumb',
				icon: 'AddRoad',
			},
			button: {
				id: 'button',
				text: 'Button',
				path: 'components/button',
				icon: 'SmartButton',
			},
			buttonGroup: {
				id: 'buttonGroup',
				text: 'Button Group',
				path: 'components/button-group',
				icon: 'Splitscreen',
			},
			card: {
				id: 'card',
				text: 'Card',
				path: 'components/card',
				icon: 'Crop32',
			},
			carousel: {
				id: 'carousel',
				text: 'Carousel',
				path: 'components/carousel',
				icon: 'RecentActors',
			},
			// Close
			collapse: {
				id: 'collapse',
				text: 'Collapse',
				path: 'components/collapse',
				icon: 'UnfoldLess',
			},
			dropdowns: {
				id: 'dropdowns',
				text: 'Dropdowns',
				path: 'components/dropdowns',
				icon: 'Inventory',
			},
			listGroup: {
				id: 'listGroup',
				text: 'List Group',
				path: 'components/list-group',
				icon: 'ListAlt',
			},
			modal: {
				id: 'modal',
				text: 'Modal',
				path: 'components/modal',
				icon: 'PictureInPicture',
			},
			navsTabs: {
				id: 'navsTabs',
				text: 'Navs & Tabs',
				path: 'components/navs-and-tabs',
				icon: 'PivotTableChart',
			},
			// Navbar
			offcanvas: {
				id: 'offcanvas',
				text: 'Offcanvas',
				path: 'components/offcanvas',
				icon: 'VerticalSplit',
			},
			pagination: {
				id: 'pagination',
				text: 'Pagination',
				path: 'components/pagination',
				icon: 'Money',
			},
			popovers: {
				id: 'popovers',
				text: 'Popovers',
				path: 'components/popovers',
				icon: 'Assistant',
			},
			progress: {
				id: 'progress',
				text: 'Progress',
				path: 'components/progress',
				icon: 'HourglassTop',
			},
			scrollspy: {
				id: 'scrollspy',
				text: 'Scrollspy',
				path: 'components/scrollspy',
				icon: 'KeyboardHide',
			},
			spinners: {
				id: 'spinners',
				text: 'Spinners',
				path: 'components/spinners',
				icon: 'RotateRight',
			},
			table: {
				id: 'table',
				text: 'Table',
				path: 'components/table',
				icon: 'TableChart',
			},
			toasts: {
				id: 'toasts',
				text: 'Toasts',
				path: 'components/toasts',
				icon: 'RotateRight',
			},
			tooltip: {
				id: 'tooltip',
				text: 'Tooltip',
				path: 'components/tooltip',
				icon: 'Assistant',
			},
		},
	},
	forms: {
		id: 'forms',
		text: 'Forms',
		path: 'forms',
		icon: 'CheckBox',
		notification: 'success',
		subMenu: {
			formGroup: {
				id: 'formGroup',
				text: 'Form Group',
				path: 'forms/form-group',
				icon: 'Source',
			},
			formControl: {
				id: 'formControl',
				text: 'Form Controls',
				path: 'forms/form-controls',
				icon: 'Create',
			},
			select: {
				id: 'select',
				text: 'Select',
				path: 'forms/select',
				icon: 'Checklist',
			},
			checksAndRadio: {
				id: 'checksAndRadio',
				text: 'Checks & Radio',
				path: 'forms/checks-and-radio',
				icon: 'CheckBox',
			},
			range: {
				id: 'range',
				text: 'Range',
				path: 'forms/range',
				icon: 'HdrStrong',
			},
			inputGroup: {
				id: 'inputGroup',
				text: 'Input Group',
				path: 'forms/input-group',
				icon: 'PowerInput',
			},
			validation: {
				id: 'validation',
				text: 'Validation',
				path: 'forms/validation',
				icon: 'VerifiedUser',
			},
			wizard: {
				id: 'wizard',
				text: 'Wizard',
				path: 'forms/wizard',
				icon: 'LinearScale',
			},
		},
	},
	content: {
		id: 'content',
		text: 'Content',
		path: 'content',
		icon: 'format_size',
		subMenu: {
			typography: {
				id: 'typography',
				text: 'Typography',
				path: 'content/typography',
				icon: 'text_fields',
			},
			images: {
				id: 'images',
				text: 'Images',
				path: 'content/images',
				icon: 'Image ',
			},
			tables: {
				id: 'tables',
				text: 'Tables',
				path: 'content/tables',
				icon: 'table_chart',
			},
			figures: {
				id: 'figures',
				text: 'Figures',
				path: 'content/figures',
				icon: 'Photo Library ',
			},
		},
	},
	utilities: {
		id: 'utilities',
		text: 'Utilities',
		path: 'utilities',
		icon: 'Support',
		subMenu: {
			api: {
				id: 'api',
				text: 'API',
				path: 'utilities/api',
				icon: 'Api',
			},
			background: {
				id: 'background',
				text: 'Background',
				path: 'utilities/background',
				icon: 'FormatColorFill',
			},
			borders: {
				id: 'borders',
				text: 'Borders',
				path: 'utilities/borders',
				icon: 'BorderStyle',
			},
			colors: {
				id: 'colors',
				text: 'Colors',
				path: 'utilities/colors',
				icon: 'InvertColors',
			},
			display: {
				id: 'display',
				text: 'Display',
				path: 'utilities/display',
				icon: 'LaptopMac',
			},
			flex: {
				id: 'flex',
				text: 'Flex',
				path: 'utilities/flex',
				icon: 'SettingsOverscan',
			},
			float: {
				id: 'float',
				text: 'Float',
				path: 'utilities/float',
				icon: 'ViewArray',
			},
			interactions: {
				id: 'interactions',
				text: 'Interactions',
				path: 'utilities/interactions',
				icon: 'Mouse',
			},
			overflow: {
				id: 'overflow',
				text: 'Overflow',
				path: 'utilities/overflow',
				icon: 'TableRows',
			},
			position: {
				id: 'position',
				text: 'Position',
				path: 'utilities/position',
				icon: 'Adjust',
			},
			shadows: {
				id: 'shadows',
				text: 'Shadows',
				path: 'utilities/shadows',
				icon: 'ContentCopy',
			},
			sizing: {
				id: 'sizing',
				text: 'Sizing',
				path: 'utilities/sizing',
				icon: 'Straighten',
			},
			spacing: {
				id: 'spacing',
				text: 'Spacing',
				path: 'utilities/spacing',
				icon: 'SpaceBar',
			},
			text: {
				id: 'text',
				text: 'Text',
				path: 'utilities/text',
				icon: 'TextFields',
			},
			verticalAlign: {
				id: 'vertical-align',
				text: 'Vertical Align',
				path: 'utilities/vertical-align',
				icon: 'VerticalAlignCenter',
			},
			visibility: {
				id: 'visibility',
				text: 'Visibility',
				path: 'utilities/visibility',
				icon: 'Visibility',
			},
		},
	},
	extra: {
		id: 'extra',
		text: 'Extra Library',
		icon: 'Extension',
		path: undefined,
	},
	icons: {
		id: 'icons',
		text: 'Icons',
		path: 'icons',
		icon: 'Grain',
		notification: 'success',
		subMenu: {
			icon: {
				id: 'icon',
				text: 'Icon',
				path: 'icons/icon',
				icon: 'Lightbulb',
			},
			material: {
				id: 'material',
				text: 'Material',
				path: 'icons/material',
				icon: 'Verified',
			},
		},
	},
	charts: {
		id: 'charts',
		text: 'Charts',
		path: 'charts',
		icon: 'AreaChart',
		notification: 'success',
		subMenu: {
			chartsUsage: {
				id: 'chartsUsage',
				text: 'General Usage',
				path: 'charts/general-usage',
				icon: 'Description',
			},
			chartsSparkline: {
				id: 'chartsSparkline',
				text: 'Sparkline',
				path: 'charts/sparkline',
				icon: 'AddChart',
			},
			chartsLine: {
				id: 'chartsLine',
				text: 'Line',
				path: 'charts/line',
				icon: 'ShowChart',
			},
			chartsArea: {
				id: 'chartsArea',
				text: 'Area',
				path: 'charts/area',
				icon: 'AreaChart',
			},
			chartsColumn: {
				id: 'chartsColumn',
				text: 'Column',
				path: 'charts/column',
				icon: 'BarChart',
			},
			chartsBar: {
				id: 'chartsBar',
				text: 'Bar',
				path: 'charts/bar',
				icon: 'StackedBarChart',
			},
			chartsMixed: {
				id: 'chartsMixed',
				text: 'Mixed',
				path: 'charts/mixed',
				icon: 'MultilineChart',
			},
			chartsTimeline: {
				id: 'chartsTimeline',
				text: 'Timeline',
				path: 'charts/timeline',
				icon: 'WaterfallChart',
			},
			chartsCandleStick: {
				id: 'chartsCandleStick',
				text: 'Candlestick',
				path: 'charts/candlestick',
				icon: 'Cake',
			},
			chartsBoxWhisker: {
				id: 'chartsBoxWhisker',
				text: 'Box Whisker',
				path: 'charts/box-whisker',
				icon: 'SportsMma',
			},
			chartsPieDonut: {
				id: 'chartsPieDonut',
				text: 'Pie & Donut',
				path: 'charts/pie-donut',
				icon: 'PieChart',
			},
			chartsRadar: {
				id: 'chartsRadar',
				text: 'Radar',
				path: 'charts/radar',
				icon: 'BrightnessLow',
			},
			chartsPolar: {
				id: 'chartsPolar',
				text: 'Polar',
				path: 'charts/polar',
				icon: 'TrackChanges',
			},
			chartsRadialBar: {
				id: 'chartsRadialBar',
				text: 'Radial Bar',
				path: 'charts/radial-bar',
				icon: 'DonutLarge',
			},
			chartsBubble: {
				id: 'chartsBubble',
				text: 'Bubble',
				path: 'charts/bubble',
				icon: 'BubbleChart',
			},
			chartsScatter: {
				id: 'chartsScatter',
				text: 'Scatter',
				path: 'charts/scatter',
				icon: 'ScatterPlot',
			},
			chartsHeatMap: {
				id: 'chartsHeatMap',
				text: 'Heat Map',
				path: 'charts/heat-map',
				icon: 'GridOn',
			},
			chartsTreeMap: {
				id: 'chartsTreeMap',
				text: 'Tree Map',
				path: 'charts/tree-map',
				icon: 'AccountTree',
			},
		},
	},
	notification: {
		id: 'notification',
		text: 'Notification',
		path: 'notifications',
		icon: 'NotificationsNone',
	},
	hooks: {
		id: 'hooks',
		text: 'Hooks',
		path: 'hooks',
		icon: 'Anchor',
	},
};

export const productsExampleMenu = {
	companyA: { id: 'companyA', text: 'Company A', path: 'grid-pages/products', subMenu: null },
	companyB: { id: 'companyB', text: 'Company B', path: '/', subMenu: null },
	companyC: { id: 'companyC', text: 'Company C', path: '/', subMenu: null },
	companyD: { id: 'companyD', text: 'Company D', path: '/', subMenu: null },
};