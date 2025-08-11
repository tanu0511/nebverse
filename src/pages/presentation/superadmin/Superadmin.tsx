/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
import React, { useContext, useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
    SubHeaderLeft,
   
    SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
// Make sure the helper file exists and exports TABS and TTabs
import { TABS, TTabs } from '../dashboard/common/helper'; // Adjust the import path as necessary
import Button from '../../../components/bootstrap/Button';
import CommonDashboardSalesByStore from '../dashboard/common/CommonDashboardSalesByStore';
import ThemeContext from '../../../contexts/themeContext';
import InactiveCompanies from './InactiveCompanies';
import TotalPackage from './TotalPackage';
import LicenseExpired from './LicenseExpired';
import TotalCompanies from './TotalCompanies';
import ActiveCompanies from './ActiveCompanies';
import NewRegCompanies from './NewRegCompanies';
import CompaniesUser from './CompaniesUser';
import PackageCount from './PackageCount';
import RecentPaidSubs from './RecentPaidSubs';
import RecentLicEx from './RecentLicEx';

const Superadmin = () => {
    const { mobileDesign } = useContext(ThemeContext);

    // Tour logic
    const { setIsOpen } = useTour();
    useEffect(() => {
        if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
            setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('tourModalStarted', 'shown');
            }, 7000);
        }
    }, [mobileDesign, setIsOpen]);

    const { themeStatus } = useDarkMode();
    const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

   

    return (
        <PageWrapper>
            <SubHeader>
                <SubHeaderLeft>
                    <span className='h4 mb-0 fw-bold'>Super Admin Dashboard</span>
                    <SubheaderSeparator />
                    

                </SubHeaderLeft>

                <Button
                icon='Settings'
                color='info'
                isLink
                size='lg'
                >

                </Button>
            </SubHeader>

            <Page container='fluid'>
                <div className='row'>
                    {/* <div className='col-12'>
                        <CommonDashboardAlert />
                    </div> */}
                    <div className='col-xxl-4'>
                        <TotalCompanies activeTab={activeTab} />
                    </div>
                   
                 <div className='col-xxl-4'>
                        <ActiveCompanies activeTab={activeTab} />
                    </div>
                    <div className='col-xxl-4'>
                        <LicenseExpired activeTab={activeTab} />
                    </div>
                     <div className='col-xxl-4'>
                        <InactiveCompanies activeTab={activeTab} />
                    </div>
                    <div className='col-xxl-4'>
                        <TotalPackage activeTab={activeTab} />
                    </div>
                    <div className='col-xl-6 '>  
                        <NewRegCompanies/>
                    </div>
                     <div className='col-xl-6'>  
                        <RecentPaidSubs/>
                    </div>
                      <div className='col-xl-6'>  
                        <CompaniesUser/>
                    </div>
                     <div className='col-xl-6'>  
                        <PackageCount/>
                    </div>
                    
                         <div className='col-xl-6'>  
                        <RecentLicEx/>
                    </div>
                     
                    
                    <div className='col-xl-6'>
                        <CommonDashboardSalesByStore />
                    </div>
                    {/* <div className='col-xxl-12'>
                        <CommonDashboardRecentActivities />
                    </div>
                    <div className='col-xxl-12'>
                        <CommonDashboardUserIssue />
                    </div>
                   
                    <div className='col-xxl-4 col-xl-6'>
                        <CommonDashboardWaitingAnswer />
                    </div>
                    <div className='col-xxl-4 col-xl-6'>
                        <CommonMyWallet />
                    </div>
                    <div className='col-xxl-8'>
                        <CommonDashboardTopSeller />
                    </div> */}
                </div>
            </Page>
        </PageWrapper>
    );
};

export default Superadmin;