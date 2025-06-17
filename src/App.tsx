import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Table, Tag, Avatar, Dropdown, Space, ConfigProvider, theme as antdTheme, Segmented, Select, Modal, Upload, message, Card, Collapse, Tree, Skeleton, DatePicker } from 'antd';
import { PlusOutlined, UserOutlined, BellOutlined, FileTextOutlined, SettingOutlined, LogoutOutlined, BulbOutlined, BulbFilled, ArrowUpOutlined, PaperClipOutlined, CloseOutlined, MessageOutlined, ArrowRightOutlined, FolderOutlined, DownOutlined, RightOutlined, CalendarOutlined, TagsOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;

const contractData = [
  {
    key: '1',
    name: 'NDA with Acme Corp',
    status: 'Active',
    owner: 'Alice Smith',
    updated: '2024-07-01',
  },
  {
    key: '2',
    name: 'Supplier Agreement',
    status: 'Pending',
    owner: 'Bob Lee',
    updated: '2024-06-28',
  },
  {
    key: '3',
    name: 'Employment Contract',
    status: 'Expired',
    owner: 'Carol White',
    updated: '2024-05-15',
  },
];

const statusColors = {
  Active: 'green',
  Pending: 'gold',
  Expired: 'red',
};

const columns = [
  {
    title: 'Contract Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag color={statusColors[status as keyof typeof statusColors] || 'blue'}>{status}</Tag>,
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
  },
];

const userMenuItems = [
  { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  { type: 'divider' as const },
  { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' }
];

const attachmentMenuItems = [
  { key: 'single', label: 'Single upload' },
  { key: 'upload', label: 'Bulk upload' },
  { key: 'docusign', label: 'Import from Docusign', disabled: true },
  { type: 'divider' as const },
  { key: 'signed-test', label: 'Signed (test)' }
];

const statusFilters = ['All', 'Active', 'Pending', 'Expired'];

const siderMenuItems = [
  { key: 'dashboard', icon: <FileTextOutlined />, label: 'Dashboard' },
  { key: 'contracts', icon: <FileTextOutlined />, label: 'Contracts' },
  { key: 'chat', icon: <MessageOutlined />, label: 'Chat' },
  { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' }
];

declare global {
  interface Window {
    cursor: any;
  }
}

// NDA model placeholder
const NDA_MODEL = `NON-DISCLOSURE AGREEMENT (NDA)

1. Parties
2. Definition of Confidential Information
3. Obligations of Receiving Party
4. Exclusions
5. Term and Termination
6. Governing Law
7. Signatures`;

// NDA dummy text for prototype
const NDA_DUMMY = `NON-DISCLOSURE AGREEMENT (NDA)

This Non-Disclosure Agreement ("Agreement") is entered into on [Effective date] ("Effective Date") by and between:

S-Corp. inc., a corporation organized and existing under the laws of [STATE], with its principal place of business at [ADDRESS] ("Company")

AND

[Client]
[Client address] 

RECITALS

WHEREAS, Company provides event planning, catering, and related services to high-profile clients including celebrities, public figures, and private individuals;

WHEREAS, in connection with providing such services, Company may gain access to confidential and proprietary information regarding Client's personal life, business affairs, guests, preferences, security arrangements, and other sensitive matters;

WHEREAS, Client desires to engage Company's services and requires assurance that all confidential information will be protected;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION

"Confidential Information" shall include, but not be limited to:
a) Personal information about Client, Client's family members, associates, and guests
b) Event details, including dates, locations, guest lists, and attendance
c) Security arrangements and protocols
d) Dietary preferences, restrictions, and special requirements
e) Financial information related to event budgets and payments
f) Business relationships and professional associations
g) Property layouts, access codes, and security systems
h) Photography, video, or audio recordings from events
i) Any information that would reasonably be considered private or confidential
j) Information disclosed orally, in writing, electronically, visually, or by any other means

2. OBLIGATIONS OF COMPANY

Company agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to any third party without prior written consent
c) Use Confidential Information solely for the purpose of providing contracted services
d) Implement reasonable security measures to protect Confidential Information
e) Ensure all employees, contractors, and agents sign confidentiality agreements
f) Return or destroy all Confidential Information upon request or contract termination

3. EXCLUSIONS

This Agreement does not apply to information that:
a) Is or becomes publicly available through no breach of this Agreement
b) Was rightfully known by Company prior to disclosure
c) Is rightfully received from a third party without breach of confidentiality
d) Is required to be disclosed by law or court order (with prior notice to Client when possible)

4. EMPLOYEE AND CONTRACTOR OBLIGATIONS

Company shall ensure that all employees, contractors, agents, and representatives who may have access to Confidential Information:
a) Are bound by confidentiality obligations at least as restrictive as those herein
b) Are informed of the sensitive nature of the Client relationship
c) Understand the consequences of unauthorized disclosure

5. NO PHOTOGRAPHY/RECORDING WITHOUT CONSENT

Company and its personnel shall not photograph, record, or document any aspect of Client's events or property without express written permission. Any authorized recordings shall be used solely for Company's internal quality control purposes and shall be subject to the confidentiality obligations herein.

6. SOCIAL MEDIA AND MARKETING RESTRICTIONS

Company agrees not to:
a) Post, share, or reference Client or Client's events on social media
b) Use Client's name, likeness, or event details for marketing purposes
c) Discuss or mention Client in promotional materials
d) Allow employees to post about Client or events on personal social media accounts

7. TERM AND TERMINATION

This Agreement shall remain in effect for a period of [TIME PERIOD] years from the Effective Date, or indefinitely with respect to information that remains confidential. The obligations herein shall survive termination of any service agreement between the parties.

8. REMEDIES

Client acknowledges that breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate. Therefore, Client shall be entitled to seek injunctive relief and other equitable remedies, in addition to monetary damages and attorney's fees.

9. GOVERNING LAW

This Agreement shall be governed by the laws of [STATE] without regard to conflict of law principles.

10. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties regarding confidentiality and supersedes all prior negotiations, representations, or agreements relating to this subject matter.

11. AMENDMENTS

This Agreement may only be modified in writing signed by both parties.

12. SEVERABILITY

If any provision of this Agreement is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

S-CORP. INC.

[S-corp employee name]
[Employee title]
[Employee signature]
[Employee signature date]

CLIENT

[Client signature]

[Client name]
[Signing date]

NOTARIZATION (if required)

[State of notarisation]
[County of notarisation]

On this [Day] day of [Month], [Year], before me personally appeared [Client name], who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that he/she executed the same in his/her authorized capacity, and that by his/her signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.

I certify under PENALTY OF PERJURY under the laws of the State of [Notary state] that the foregoing paragraph is true and correct.

WITNESS my hand and official seal.

[Notary signature]`;

// Add the full text of the signed test document (replace the previous SIGNED_TEST_DOC)
const SIGNED_TEST_DOC = `MASTER SERVICE AGREEMENT

Agreement Number: MSA-2025-003
Document Version: 2.1
Initial Draft Date: February 28, 2025
Legal Review Completed: March 8, 2025
Final Negotiation Date: March 12, 2025
Board Approval Date: March 14, 2025

This Master Service Agreement ("Agreement") is entered into on March 15, 2025 ("Effective Date") by and between:

S-Corp. inc., a California corporation with its principal place of business at 1847 Sunset Boulevard, Los Angeles, CA 90026 ("S-Corp" or "Company")

AND

Le Taco Truc LLC, a California limited liability company with its principal place of business at 3421 Venice Boulevard, Los Angeles, CA 90019 ("Le Taco Truc" or "Vendor")

RECITALS

WHEREAS, S-Corp provides event planning and catering services to high-profile clients including celebrities, entertainment industry professionals, and private individuals;

WHEREAS, Le Taco Truc operates a mobile food service specializing in authentic Mexican cuisine and gourmet tacos;

WHEREAS, S-Corp desires to engage Le Taco Truc as a preferred catering vendor for events requiring mobile food service;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. SERVICES
Le Taco Truc agrees to provide mobile catering services including:
a) On-site food preparation and service via food truck
b) Authentic Mexican cuisine including tacos, quesadillas, nachos, and beverages
c) Customized menu options for dietary restrictions and preferences
d) Professional uniformed staff for food service
e) All necessary permits, licenses, and insurance for mobile food operations
f) Setup and breakdown of service area

2. TERM
This Agreement shall commence on March 15, 2025 ("Commencement Date") and continue for a primary term of two (2) years, expiring on March 14, 2027 ("Initial Expiration Date"). 

RENEWAL TERMS:
- First Automatic Renewal: March 15, 2027 - March 14, 2028 (unless notice given by January 14, 2027)
- Subsequent Renewals: Additional one-year terms
- Maximum Agreement Duration: 10 years from Commencement Date
- Next Review Date: September 15, 2025 (6-month performance review)
- Annual Rate Review Date: Each March 1st
- Pricing Adjustment Effective Date: Each April 1st

3. PRICING AND PAYMENT TERMS

a) Base Service Fee: $2,500 per event (up to 4 hours service, 100 guests)
b) Additional Guests: $18 per person over 100 guests
c) Extended Hours: $400 per hour beyond 4-hour base
d) Travel Fee: $150 for locations beyond 25 miles from Le Taco Truc's base location
e) Premium Menu Items: As per attached Exhibit A - Menu Pricing
f) Payment Terms: Net 15 days from invoice date
g) Late Payment: 1.5% monthly service charge on overdue amounts

4. BOOKING AND SCHEDULING

BOOKING DEADLINES:
a) Standard Events: Minimum 72 hours advance notice (by 5:00 PM, 3 business days prior)
b) Premium Events (100+ guests): Minimum 5 business days advance notice
c) Holiday/Peak Season Events: Minimum 14 days advance notice
d) Rush bookings (less than 72 hours) subject to 25% surcharge if accepted

SCHEDULING COMMITMENTS:
- Le Taco Truc agrees to prioritize S-Corp events over other bookings when possible
- Preferred booking windows: Tuesday-Sunday, 11:00 AM - 8:00 PM
- Peak season dates (Memorial Day - Labor Day): Higher availability commitment required
- Holiday blackout dates: December 24-26, January 1, July 4 (premium rates apply)

CANCELLATION POLICY WITH DATES:
e) Cancellation more than 7 days prior: No charge
f) Cancellation 3-7 days prior: 25% of agreed service fee
g) Cancellation 48-72 hours prior: 50% of agreed service fee  
h) Cancellation within 48 hours: 75% of agreed service fee
i) Cancellation within 24 hours or no-show: 100% of agreed service fee

HISTORICAL PERFORMANCE BENCHMARKS:
- Average monthly bookings expected: 8-12 events
- Peak season target: 15-20 events per month
- Minimum quarterly bookings to maintain preferred status: 20 events

5. PERFORMANCE STANDARDS

Le Taco Truc agrees to:
a) Arrive at event location 30 minutes prior to service time
b) Maintain food truck in clean, professional appearance
c) Provide staff in clean, branded uniforms
d) Maintain all required health department certifications
e) Carry minimum $2M general liability insurance
f) Follow all client-specific requirements and dietary restrictions
g) Maintain confidentiality regarding client identity and event details

6. QUALITY ASSURANCE

a) All food must be prepared to health department standards
b) Fresh ingredients used daily - no day-old prepared foods
c) Maintain proper food temperatures during transport and service
d) Accommodate special dietary needs including vegan, gluten-free, and keto options
e) S-Corp reserves right to inspect food preparation and truck cleanliness

7. EXCLUSIVITY AND NON-COMPETE

During the term of this Agreement:
a) S-Corp grants Le Taco Truc preferred vendor status for Mexican cuisine mobile catering
b) Le Taco Truc agrees not to directly solicit S-Corp's clients for independent catering services
c) Le Taco Truc may accept direct bookings from S-Corp clients only with S-Corp's written consent

8. INSURANCE AND LIABILITY

INSURANCE REQUIREMENTS:
a) Le Taco Truc shall maintain the following insurance coverage:
   - General Liability: $2,000,000 per occurrence
   - Product Liability: $1,000,000 per occurrence  
   - Commercial Auto: $1,000,000 combined single limit
   - Workers' Compensation: As required by state law
   - Equipment Coverage: $150,000 (food truck and equipment)

INSURANCE COMPLIANCE DATES:
b) Initial Certificate Due: March 1, 2025 (provided)
c) Annual Renewal Date: March 1st of each year
d) Certificate Expiration Reminder: 30 days prior to expiration
e) Grace Period for Renewal: 10 days maximum
f) S-Corp to be named as additional insured on all policies
g) Insurance carrier rating requirement: A.M. Best rating of A- or better

CLAIMS HISTORY REVIEW:
- Last 3 years claims history provided: February 15, 2025
- Next claims review date: March 1, 2026
- Maximum acceptable claims per year: 2 non-catastrophic incidents

9. CONFIDENTIALITY

Le Taco Truc acknowledges that it may have access to confidential information about S-Corp's clients and agrees to:
a) Maintain strict confidentiality regarding client identities
b) Not photograph, record, or document events without permission
c) Prohibit staff from using personal devices during events
d) Not disclose event details, guest information, or client preferences

10. FORCE MAJEURE

Neither party shall be liable for delays or failures in performance due to circumstances beyond reasonable control, including but not limited to: acts of God, government regulations, strikes, or equipment failure.

11. TERMINATION

TERMINATION CONDITIONS:
Either party may terminate this Agreement under the following circumstances:

FOR CAUSE TERMINATION:
a) Material breach with 30 days written notice and opportunity to cure
b) Notice period begins on date of certified mail delivery
c) Cure period deadline: 30 calendar days from notice receipt
d) If not cured by deadline, termination effective immediately thereafter

FOR CONVENIENCE TERMINATION:
e) Either party may terminate with 60 days written notice
f) Termination effective date: 60 days from notice receipt date
g) No penalty for convenience termination after initial 12-month period

IMMEDIATE TERMINATION EVENTS:
h) Material breach of confidentiality provisions
i) Loss of required business licenses or permits
j) Bankruptcy filing or insolvency proceedings
k) Failure to maintain required insurance coverage for more than 10 days
l) Three or more event no-shows within any 6-month period

POST-TERMINATION OBLIGATIONS:
- Final invoice due within 15 days of termination
- Equipment return deadline: 30 days from termination
- Confidentiality obligations survive termination indefinitely
- Non-compete restrictions continue for 6 months post-termination

12. GOVERNING LAW

This Agreement shall be governed by California state law and any disputes shall be resolved in Los Angeles County courts.

13. ENTIRE AGREEMENT

This Agreement, including all exhibits, constitutes the entire agreement between the parties and supersedes all prior negotiations and agreements.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

DOCUMENT EXECUTION TIMELINE:
Initial Proposal Submitted: February 10, 2025
First Contract Draft: February 28, 2025  
Negotiation Period: March 1-12, 2025
Legal Review Completed: March 8, 2025
Final Terms Agreed: March 12, 2025
Internal Approvals Completed: March 14, 2025
Contract Signing Date: March 15, 2025
Effective Date: March 15, 2025
First Performance Date: March 22, 2025 (Celebrity Birthday Party - Marina del Rey)

S-CORP. INC.

By: /s/ Marcus Rodriguez
Name: Marcus Rodriguez
Title: Chief Operating Officer
Date: March 15, 2025, 2:30 PM PST
Employee ID: SCO-447
Authorization Code: MR-2025-MSA-003

LE TACO TRUC LLC

By: /s/ Sofia Hernandez
Name: Sofia Hernandez
Title: Managing Member
Date: March 15, 2025, 2:35 PM PST
Business License: LA-FT-2024-0892
Tax ID: 88-1234567

WITNESS SIGNATURES:

/s/ Jennifer Kim
Jennifer Kim, Event Coordinator
S-Corp. inc.
Date: March 15, 2025, 2:40 PM PST
Employee ID: SCO-221
Years with Company: 3.5 years

/s/ Carlos Hernandez
Carlos Hernandez, Head Chef & Co-Owner
Le Taco Truc LLC
Date: March 15, 2025, 2:45 PM PST
Culinary License: CA-CUL-2023-4456
ServSafe Certified: Valid through August 2026

NOTARIZATION:

State of California
County of Los Angeles

On March 15, 2025, before me, Patricia Wong, Notary Public, personally appeared Marcus Rodriguez and Sofia Hernandez, who proved to me on the basis of satisfactory evidence to be the persons whose names are subscribed to the within instrument and acknowledged to me that they executed the same in their authorized capacity.

I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.

WITNESS my hand and official seal.

/s/ Patricia Wong
Patricia Wong, Notary Public
Commission Number: 2387542
My Commission Expires: December 31, 2027
Seal Affixed: March 15, 2025, 3:15 PM PST

EXHIBIT A - MENU PRICING
(Effective March 15, 2025 - March 14, 2026)

PRICING HISTORY & ADJUSTMENTS:
- Initial Pricing Effective: March 15, 2025
- Mid-Contract Review Date: September 15, 2025
- Next Price Adjustment: April 1, 2026 (max 5% increase)
- Peak Season Surcharge Period: May 1 - September 30 (15% premium)
- Holiday Premium Dates: Memorial Day, July 4th, Labor Day (25% premium)

STANDARD MENU ITEMS (Included in Base Package):
- Classic Beef Tacos: $4.50 each (was $4.25 in 2024)
- Chicken Tinga Tacos: $4.25 each (no change from 2024)
- Carnitas Tacos: $4.75 each (was $4.50 in 2024)
- Vegetarian Black Bean Tacos: $4.00 each (new item as of 2025)
- Cheese Quesadillas: $6.00 each (was $5.75 in 2024)
- Chips and Guacamole: $8.00 per serving (was $7.50 in 2024)
- Mexican Rice and Beans: $3.50 per serving (no change)
- Agua Frescas (Horchata, Tamarindo): $3.00 each (was $2.75 in 2024)

PREMIUM MENU ITEMS (Additional Cost):
- Lobster Tacos: $12.00 each (seasonal: May-October)
- Prime Rib Tacos: $8.50 each (available year-round)
- Grilled Salmon Tacos: $9.00 each (available year-round)
- Truffle Quesadillas: $14.00 each (limited availability - advance order required)
- Craft Beer Selection: $6.00-$8.00 each (permit renewal: annually)
- Premium Margaritas: $12.00 each (bartender service required)

DIETARY ACCOMMODATION OPTIONS:
- Gluten-Free Corn Tortillas: No additional charge (certified supplier since 2024)
- Vegan Protein Options: $1.00 additional per taco (Beyond Meat partnership)
- Keto Bowl (no tortilla): $2.00 additional (introduced January 2025)
- Organic Ingredients: 15% surcharge on affected items (certification valid through 2026)

VOLUME DISCOUNTS (Applied automatically):
- 150+ guests: 5% discount on food items
- 200+ guests: 8% discount on food items  
- 300+ guests: 10% discount on food items
- Monthly volume over 500 servings: 3% additional discount

PAYMENT SCHEDULE FOR RECURRING EVENTS:
- Weekly events: Net 15 payment terms
- Monthly events: Net 20 payment terms
- Seasonal contracts: 50% deposit, balance due within 30 days
- Annual retainer option: 10% discount, paid quarterly

HISTORICAL PERFORMANCE DATA:
- Average event size: 125 guests
- Most popular items: Chicken Tinga (35%), Carnitas (30%), Beef (25%)
- Customer satisfaction rating: 4.8/5.0 (based on 247 events, 2024)
- On-time arrival rate: 98.2% (2024 performance)
- Health inspection scores: 98-100 (last 3 inspections)

CONTRACT MILESTONES:
- First 90 days: Probationary period with monthly check-ins
- 6-month review: September 15, 2025
- 12-month performance evaluation: March 15, 2026
- 18-month renewal discussion: September 15, 2026
- Contract expiration: March 14, 2027
`;

// Add a spinning loader component
const Spinner = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'spin 1s linear infinite', display: 'block' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12C6 15.3138 8.68628 17.9997 12 17.9997V24C5.37247 24 0 18.6271 0 12C0 5.37282 5.37247 0 12 0V6.00023C8.68628 6.00023 6 8.68618 6 12M18 12C18 8.68618 15.3138 6.00023 12 6.00023V17.9997C15.3138 17.9997 18 15.3138 18 12"
        fill="white"
      />
    </svg>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </span>
);

function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPage, setSelectedPage] = useState<'dashboard' | 'contracts' | 'chat'>('dashboard');
  const [collapsed, setCollapsed] = useState(true);
  const [chatMode, setChatMode] = useState<'Ask' | 'Create' | 'Search'>('Ask');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [documentContent, setDocumentContent] = useState('');
  const [createInput, setCreateInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [documentLoading, setDocumentLoading] = useState(false);
  const [awaitingSignatories, setAwaitingSignatories] = useState(false);
  const [signatoriesInput, setSignatoriesInput] = useState('');
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [currentInputIdx, setCurrentInputIdx] = useState<number>(0);
  const [aiFormattingEnabled, setAiFormattingEnabled] = React.useState(true);
  const [showFormatted, setShowFormatted] = React.useState(true);
  const [fade, setFade] = React.useState(true);
  const [signatureModalOpen, setSignatureModalOpen] = React.useState(false);
  const [selectedSigner, setSelectedSigner] = React.useState(null);
  const [clientEmail, setClientEmail] = React.useState('');
  const [customMessage, setCustomMessage] = React.useState('');
  const [stage, setStage] = useState('template');
  const [showSummaryView, setShowSummaryView] = useState(false);
  const [msaSummary, setMsaSummary] = useState<null | {
    created: string;
    lastModified: string;
    status: string;
    signers: string[];
    tags: string[];
  }>(null);
  const [msaClauses, setMsaClauses] = useState<{ heading: string, text: string }[]>([]);
  const sCorpEmployees = [
    'Alice Smith', 'Bob Lee', 'Charlie Kim', 'Diana Patel', 'Evan Chen',
    'Fiona Garcia', 'George Brown', 'Hannah Wilson', 'Ivan Martinez', 'Julia Clark',
    'Kevin Lewis', 'Laura Young', 'Mike Turner', 'Nina Scott', 'Oscar Adams'
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const singleFileInputRef = React.useRef<HTMLInputElement>(null);
  const signedTestFileInputRef = React.useRef<HTMLInputElement>(null);

  // Map employee names to avatar image URLs
  const sCorpEmployeeAvatars: Record<string, string> = {
    'Alice Smith': 'https://randomuser.me/api/portraits/women/1.jpg',
    'Bob Lee': 'https://randomuser.me/api/portraits/men/2.jpg',
    'Charlie Kim': 'https://randomuser.me/api/portraits/men/3.jpg',
    'Diana Patel': 'https://randomuser.me/api/portraits/women/4.jpg',
    'Evan Chen': 'https://randomuser.me/api/portraits/men/5.jpg',
    'Fiona Garcia': 'https://randomuser.me/api/portraits/women/6.jpg',
    'George Brown': 'https://randomuser.me/api/portraits/men/7.jpg',
    'Hannah Wilson': 'https://randomuser.me/api/portraits/women/8.jpg',
    'Ivan Martinez': 'https://randomuser.me/api/portraits/men/9.jpg',
    'Julia Clark': 'https://randomuser.me/api/portraits/women/10.jpg',
    'Kevin Lewis': 'https://randomuser.me/api/portraits/men/11.jpg',
    'Laura Young': 'https://randomuser.me/api/portraits/women/12.jpg',
    'Mike Turner': 'https://randomuser.me/api/portraits/men/13.jpg',
    'Nina Scott': 'https://randomuser.me/api/portraits/women/14.jpg',
    'Oscar Adams': 'https://randomuser.me/api/portraits/men/15.jpg',
  };

  const handleAttachmentMenuClick = ({ key }: MenuInfo) => {
    if (key === 'upload') {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
      }
    } else if (key === 'single') {
      if (singleFileInputRef.current) {
        singleFileInputRef.current.value = '';
        singleFileInputRef.current.click();
      }
    } else if (key === 'signed-test') {
      if (signedTestFileInputRef.current) {
        signedTestFileInputRef.current.value = '';
        signedTestFileInputRef.current.click();
      }
    }
  };

  // Add staged loading state
  const [showFileCard, setShowFileCard] = useState(false);
  const [showSummaryMsg, setShowSummaryMsg] = useState(false);
  const [showSummaryCard, setShowSummaryCard] = useState(false);
  // Replace multiple staged states with a single staged index
  const [stagedStep, setStagedStep] = useState(0); // 0: nothing, 1: file card, 2: summary msg, 3: summary card

  // In handleSignedTestFileChange and handleSingleFileChange, reset and stage the reveals
  const revealSystemSequence = () => {
    setStagedStep(0);
    setTimeout(() => setStagedStep(1), 600);
    setTimeout(() => setStagedStep(2), 1200);
    setTimeout(() => setStagedStep(3), 1800);
  };

  const handleSignedTestFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setDocumentType('Signed');
    setDocumentContent(text);
    setUploadedFiles([file]);
    setSelectedPage('chat');
    setChatMessages([
      { role: 'assistant', content: 'We detected that your document is a "Signed contract" for a "Master Service Agreement." See the data we extracted below in your summary card.' }
    ]);
    revealSystemSequence();
    if (file.name === 'scorp_letacotruck_msa (1).txt') {
      setStage('signed');
      // Parse summary data from the file text
      const createdMatch = text.match(/Initial Draft Date: ([^\n]+)/);
      const lastModifiedMatch = text.match(/Final Terms Agreed: ([^\n]+)/);
      const status = 'Signed';
      const signers: string[] = [];
      const sCorpSignerMatch = text.match(/By: \/s\/ ([^\n]+)\nName: ([^\n]+)/);
      const vendorSignerMatch = text.match(/By: \/s\/ ([^\n]+)\nName: ([^\n]+)/g);
      if (sCorpSignerMatch) signers.push(sCorpSignerMatch[2]);
      const vendorNameMatch = text.match(/LE TACO TRUC LLC[\s\S]+By: \/s\/ ([^\n]+)\nName: ([^\n]+)/);
      if (vendorNameMatch) signers.push(vendorNameMatch[2]);
      // Tags: MSA, Signed, Vendor, S-Corp, 2025
      const tags = ['MSA', 'Signed', 'Vendor', 'S-Corp', '2025'];
      setMsaSummary({
        created: createdMatch ? createdMatch[1] : '',
        lastModified: lastModifiedMatch ? lastModifiedMatch[1] : '',
        status,
        signers,
        tags,
      });
      // Extract clause headings and full text
      const clauseRegex = /^(\d+\. .+?)(?:\n|\r\n)([\s\S]*?)(?=^\d+\. |^IN WITNESS|^EXHIBIT|\Z)/gm;
      const clauses: { heading: string, text: string }[] = [];
      let match;
      while ((match = clauseRegex.exec(text)) !== null) {
        clauses.push({ heading: match[1].trim(), text: match[2].trim() });
      }
      setMsaClauses(clauses);
    } else {
      setStage('template');
      setMsaSummary(null);
      setMsaClauses([]);
    }
  };

  const filteredData = contractData.filter(contract => {
    const matchesStatus = status === 'All' || contract.status === status;
    const matchesSearch = contract.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Add or remove 'dark' class from html element for Tailwind dark mode
  React.useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(files);
    setUploadModalVisible(true);
  };

  // Add normalization for LLM classification
  function normalizeClassification(response: string): string {
    const lower = response.toLowerCase();
    if (lower.includes('signed')) return 'Signed contract';
    if (lower.includes('template')) return 'Contract template';
    if (lower.includes('draft')) return 'Draft contract';
    return 'Unknown';
  }

  // Update classifyDocumentWithLLM to use normalization
  async function classifyDocumentWithLLM(text: string): Promise<string> {
    if (window.cursor && window.cursor.ask) {
      const result = await window.cursor.ask({
        prompt: `Classify the following document as one of: "Draft contract", "Contract template", or "Signed contract". Only respond with the classification.\n\nDocument:\n${text}`
      });
      return normalizeClassification(result.text.trim());
    }
    return 'Unknown';
  }

  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentType('Agreement template');
    setDocumentContent(NDA_DUMMY);
    setSelectedPage('chat');
    setChatMessages([
      { role: 'assistant', content: 'We detected that your document is an "Agreement template" for a "Non-Disclosure Agreement." Please review the document and proceed as needed.' }
    ]);
    revealSystemSequence();
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleModalOk = async () => {
    if (uploadedFiles.length === 0) {
      message.warning('No files to upload.');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    uploadedFiles.forEach(file => {
      formData.append('files', file);
    });
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      message.success('Files uploaded!');
      setUploadModalVisible(false);
      setUploadedFiles([]);
    } catch (err) {
      message.error('Failed to upload files.');
    } finally {
      setUploading(false);
    }
  };

  const handleModalCancel = () => {
    setUploadModalVisible(false);
    setUploadedFiles([]);
  };

  async function generateDocumentFromLLM(userInput: string) {
    try {
      if (!window.cursor || !window.cursor.ask) {
        console.error("Cursor AI is not available in this environment.");
        return "Cursor AI is not available in this environment.";
      }
      const result = await window.cursor.ask({
        prompt: "You are a legal document generator. When given a request, generate a model document (e.g., a sales agreement, NDA, etc.) in clear, professional language.\n\n" + userInput
      });
      console.log('Cursor LLM result:', result);
      if (!result || !result.text) {
        return "Cursor AI did not return a document.";
      }
      return result.text;
    } catch (err) {
      console.error("Error in generateDocumentFromLLM:", err);
      return "Cursor AI failed to generate a document.";
    }
  }

  const handleCreateSubmit = async () => {
    if (!createInput.trim()) return;
    setChatMessages([
      { role: 'user', content: createInput },
      { role: 'assistant', content: 'Document creation started. Please provide more details or ask questions.' },
      { role: 'assistant', content: 'Who are the signatories?' }
    ]);
    setDocumentLoading(true);
    setDocumentContent('');
    setSelectedPage('chat');
    setCreateInput('');
    setAwaitingSignatories(true);
    setSignatoriesInput('');
  };

  const handleSignatoriesSubmit = async (skip = false) => {
    let newMessages = [...chatMessages];
    if (!skip && signatoriesInput.trim()) {
      newMessages.push({ role: 'user', content: signatoriesInput });
    } else if (skip) {
      newMessages.push({ role: 'user', content: '[Skipped signatories]' });
    }
    setChatMessages(newMessages);
    setAwaitingSignatories(false);
    setDocumentLoading(true);
    setDocumentContent('');
    // Compose prompt with signatories if provided
    let prompt = newMessages[0]?.content || '';
    if (!skip && signatoriesInput.trim()) {
      prompt += `\n\nThe signatories are: ${signatoriesInput}`;
    }
    try {
      const doc = await generateDocumentFromLLM(prompt);
      setDocumentContent(doc);
    } catch (err) {
      setDocumentContent('Failed to generate document. Please try again.');
    } finally {
      setDocumentLoading(false);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { role: 'user', content: chatInput },
      { role: 'assistant', content: 'Assistant response to: ' + chatInput }
    ]);
    setDocumentContent(prev => prev + '\n\n[Update based on: ' + chatInput + ']');
    setChatInput('');
  };

  // Add a function to generate a document title from the first user message
  function getDocumentTitle() {
    const firstUserMsg = chatMessages.find(m => m.role === 'user');
    if (!firstUserMsg || !firstUserMsg.content) return 'Document';
    const input = firstUserMsg.content.trim();
    // Try to extract company name after 'with'
    let company = '';
    const withMatch = input.match(/with ([A-Za-z0-9 &]+)/i);
    if (withMatch) company = withMatch[1].trim();
    // Try to detect document type
    const docTypes = [
      { pattern: /sales contract|sales agreement/i, label: 'Sales Agreement' },
      { pattern: /nda|non-disclosure/i, label: 'NDA' },
      { pattern: /employment contract|employment agreement/i, label: 'Employment Agreement' },
      { pattern: /consulting agreement/i, label: 'Consulting Agreement' },
      { pattern: /partnership agreement/i, label: 'Partnership Agreement' },
      { pattern: /lease agreement/i, label: 'Lease Agreement' },
      { pattern: /service agreement/i, label: 'Service Agreement' },
      { pattern: /supplier contract|supplier agreement/i, label: 'Supplier Agreement' },
      { pattern: /ip assignment/i, label: 'IP Assignment' },
      { pattern: /loan agreement/i, label: 'Loan Agreement' },
      { pattern: /contract/i, label: 'Contract' },
      { pattern: /agreement/i, label: 'Agreement' },
    ];
    let docLabel = '';
    for (const type of docTypes) {
      if (type.pattern.test(input)) {
        docLabel = type.label;
        break;
      }
    }
    if (company && docLabel) return `${company} ${docLabel}`;
    if (docLabel) return docLabel;
    // Fallback: use first 6 words
    const words = input.split(/\s+/);
    let title = words.slice(0, 6).join(' ');
    if (words.length > 6) title += '...';
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  // Count number of input fields in documentContent
  const numInputs = React.useMemo(() => {
    if (!documentContent) return 0;
    const matches = documentContent.match(/\[[^\]]+\]/g);
    return matches ? matches.length : 0;
  }, [documentContent]);

  // Create refs for each input
  const inputRefs = React.useMemo(() =>
    Array.from({ length: numInputs }, () => React.createRef<HTMLInputElement>()),
    [numInputs]
  );

  // Focus the first input on document load
  React.useEffect(() => {
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs, documentContent]);

  // Add dark mode support for the background
  React.useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--doc-header-bg', '#232326');
    } else {
      root.style.setProperty('--doc-header-bg', '#f5f5f7');
    }
  }, [darkMode]);

  React.useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => {
      setShowFormatted(aiFormattingEnabled);
      setFade(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [aiFormattingEnabled]);

  // Add click handler for the summary card
  const handleSummaryCardClick = () => {
    setShowSummaryView(true);
  };

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Folder tree data
  const folderTreeData = [
    {
      title: 'Personal folder',
      key: 'personal',
      selectable: true,
      icon: <FolderOutlined />,
    },
    // Remove the separator node from the treeData
    ...Array.from({ length: 15 }).map((_, i) => ({
      title: `Parent Folder ${i + 1}`,
      key: `parent-${i + 1}`,
      icon: <FolderOutlined />,
      children: [
        { title: `Child Folder ${i + 1}.1`, key: `parent-${i + 1}-child-1`, icon: <FolderOutlined /> },
        { title: `Child Folder ${i + 1}.2`, key: `parent-${i + 1}-child-2`, icon: <FolderOutlined /> },
      ],
    })),
  ];

  // Add state for editable summary fields
  const [editableSummary, setEditableSummary] = useState({
    brief: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
      ? 'This Master Service Agreement (MSA) establishes a signed contract between S-Corp and Le Taco Truc for mobile catering services, including real lifecycle and signature data.'
      : 'This Non-Disclosure Agreement (NDA) is designed to protect confidential information shared between S-Corp and their clients. It covers various aspects of confidentiality including personal information, event details, and business relationships.',
    created: msaSummary?.created || 'March 15, 2024',
    lastModified: msaSummary?.lastModified || 'March 20, 2024',
    status: msaSummary?.status || 'Template',
    signers: msaSummary?.signers || [''],
    tags: msaSummary?.tags || ['NDA', 'Template', 'Legal', 'Confidentiality', 'Client Services'],
    clauses: msaClauses?.map(c => ({ heading: c.heading, text: c.text })) || [],
  });
  const [editing, setEditing] = useState(false);

  // Add effect to reset editableSummary when msaSummary, msaClauses, or uploadedFiles change
  React.useEffect(() => {
    setEditableSummary({
      brief: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
        ? 'This Master Service Agreement (MSA) establishes a signed contract between S-Corp and Le Taco Truc for mobile catering services, including real lifecycle and signature data.'
        : 'This Non-Disclosure Agreement (NDA) is designed to protect confidential information shared between S-Corp and their clients. It covers various aspects of confidentiality including personal information, event details, and business relationships.',
      created: msaSummary?.created || 'March 15, 2024',
      lastModified: msaSummary?.lastModified || 'March 20, 2024',
      status: msaSummary?.status || 'Template',
      signers: msaSummary?.signers || [''],
      tags: msaSummary?.tags || ['NDA', 'Template', 'Legal', 'Confidentiality', 'Client Services'],
      clauses: msaClauses?.map(c => ({ heading: c.heading, text: c.text })) || [],
    });
  }, [msaSummary, msaClauses, uploadedFiles]);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF5669',
        },
      }}
    >
      <Layout className={`min-h-screen h-screen w-screen ${darkMode ? 'dark' : ''}`} style={{ minHeight: '100vh', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Sider
          width={200}
          className="bg-white dark:bg-gray-900 shadow-md flex flex-col relative"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
        >
          <div className="h-16 flex items-center justify-center text-xl font-bold border-b dark:border-gray-800 dark:text-white">
            {collapsed ? <span className="text-2xl">C</span> : 'Concord'}
          </div>
          <Button
            type="text"
            className="w-full flex items-center justify-center py-2 border-b dark:border-gray-800"
            icon={collapsed ? <PlusOutlined rotate={45} /> : <PlusOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          />
          <Menu
            mode="inline"
            selectedKeys={[selectedPage]}
            style={{ flex: 1, borderRight: 0 }}
            className={darkMode ? 'dark-menu' : ''}
            theme={darkMode ? 'dark' : 'light'}
            onClick={({ key }) => {
              if (key === 'dashboard' || key === 'contracts' || key === 'chat') setSelectedPage(key as 'dashboard' | 'contracts' | 'chat');
            }}
            inlineCollapsed={collapsed}
            items={siderMenuItems}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
            <Space size="middle" direction="vertical" className="w-full items-center pb-6">
              <Button icon={<BellOutlined />} shape="circle" />
              <Button
                icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
                shape="circle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              />
              <Dropdown menu={{ items: userMenuItems }} placement="topRight">
                <Avatar style={{ backgroundColor: darkMode ? '#222' : '#1890ff' }} icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </div>
        </Sider>
        <Layout style={{ height: '100%', minHeight: 0 }}>
          <Content className={selectedPage === 'chat' ? '' : 'm-6'} style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
            {selectedPage === 'dashboard' ? (
              <div className="flex flex-col items-center justify-center h-[80vh]">
                <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center dark:text-white">Let's unlock your data</h1>
                <div className="w-full max-w-2xl">
                  <div
                    className="relative rounded-xl border border-transparent bg-gray-100 dark:bg-[#232326] p-6 flex flex-col min-h-[160px] transition-all duration-200 shadow-none hover:shadow-md"
                  >
                    <textarea
                      className="w-full bg-transparent outline-none resize-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 min-h-[60px] pr-12 transition-all duration-200"
                      placeholder={
                        chatMode === 'Ask' ? 'Ask anything...'
                        : chatMode === 'Create' ? 'Create or upload new documents...'
                        : 'Search all documents...'
                      }
                      rows={3}
                      value={createInput}
                      onChange={e => setCreateInput(e.target.value)}
                      onKeyDown={e => {
                        if (chatMode === 'Create' && e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCreateSubmit();
                        }
                      }}
                    />
                    <div className="absolute bottom-4 left-0 w-full flex items-center justify-between px-4">
                      <div className="flex gap-2">
                        <Button
                          type={chatMode === 'Create' ? 'primary' : 'default'}
                          onClick={() => setChatMode(chatMode === 'Create' ? 'Ask' : 'Create')}
                          className={chatMode === 'Create' ? 'bg-[#FF5669] text-white' : ''}
                        >
                          Create
                        </Button>
                        <Button
                          type={chatMode === 'Search' ? 'primary' : 'default'}
                          onClick={() => setChatMode(chatMode === 'Search' ? 'Ask' : 'Search')}
                          className={chatMode === 'Search' ? 'bg-[#FF5669] text-white' : ''}
                        >
                          Search
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        {chatMode === 'Create' && (
                          <Select
                            showSearch
                            placeholder="Select template"
                            style={{ borderRadius: 16, minWidth: 150 }}
                            options={[
                              { label: 'NDA Template', value: 'nda' },
                              { label: 'Employment Contract', value: 'employment' },
                              { label: 'Consulting Agreement', value: 'consulting' },
                              { label: 'Sales Agreement', value: 'sales' },
                              { label: 'Partnership Agreement', value: 'partnership' },
                              { label: 'Lease Agreement', value: 'lease' },
                              { label: 'Service Agreement', value: 'service' },
                              { label: 'Supplier Contract', value: 'supplier' },
                              { label: 'IP Assignment', value: 'ip' },
                              { label: 'Loan Agreement', value: 'loan' },
                            ]}
                            allowClear
                          />
                        )}
                        {(chatMode === 'Ask' || chatMode === 'Create') && (
                          <Dropdown
                            menu={{ items: attachmentMenuItems, onClick: handleAttachmentMenuClick }}
                            trigger={['click']}
                            placement="bottomRight"
                          >
                            <button
                              className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors p-0"
                              aria-label="Attach file"
                              type="button"
                            >
                              <PaperClipOutlined className="text-base" />
                            </button>
                          </Dropdown>
                        )}
                        <button
                          className="bg-[#FF5669] hover:bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors p-0"
                          aria-label="Send"
                          type="button"
                          onClick={() => { if (chatMode === 'Create') handleCreateSubmit(); }}
                          disabled={chatMode === 'Create' && !createInput.trim()}
                        >
                          <ArrowUpOutlined className="text-base" style={{ color: '#fff' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedPage === 'contracts' ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                  <div>
                    <div className="text-xl font-bold mb-1 dark:text-white">Welcome to Concord</div>
                    <div className="text-gray-500 dark:text-gray-300">Manage all your contracts in one place.</div>
                  </div>
                  <Button type="primary" icon={<PlusOutlined />}>Create New Contract</Button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                  <Input.Search
                    placeholder="Search contracts..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: 300 }}
                    allowClear
                  />
                  <div className="flex gap-2 mt-2 md:mt-0">
                    {statusFilters.map(s => (
                      <Button
                        key={s}
                        type={status === s ? 'primary' : 'default'}
                        onClick={() => setStatus(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
                <Table columns={columns} dataSource={filteredData} pagination={false} bordered />
              </>
            ) : selectedPage === 'chat' ? (
              <div className="flex h-full min-h-0 rounded-xl shadow-md overflow-hidden" style={{ height: '100%' }}>
                {/* Chat panel */}
                <div className="w-2/5 border-r border-gray-200 dark:border-gray-800 flex flex-col relative h-full min-h-0">
                  <div className="flex-1 overflow-y-auto px-4 py-6" style={{ minHeight: 0 }}>
                    {/* Chat messages go here */}
                    {chatMessages.length === 0 ? (
                      <div className="text-gray-400 text-center mt-8">No messages yet.</div>
                    ) : (
                      <div className="space-y-6 w-full">
                        {chatMessages.map((msg, idx) => (
                          <React.Fragment key={idx}>
                            <div className="flex justify-start w-full">
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}`}
                                style={{
                                  background: msg.role === 'user' ? 'rgba(255,86,105,0.2)' : 'transparent',
                                  color: '#FFF',
                                  wordBreak: 'break-word',
                                  display: 'inline-block',
                                  maxWidth: '80%',
                                  minWidth: 48
                                }}
                              >
                                {msg.content}
                              </div>
                            </div>
                            {/* Staged file card */}
                            {idx === 0 && msg.role === 'assistant' && msg.content.startsWith('We detected that') && (
                              stagedStep === 0 ? (
                                <div className="flex justify-start w-full mt-2"><Spinner /></div>
                              ) : stagedStep > 0 ? (
                                <div className="flex justify-start w-full mt-2">
                                  <Card size="small" style={{ background: darkMode ? '#232326' : '#f5f5f7', color: darkMode ? '#fff' : '#222', borderRadius: 12, minWidth: 220 }}>
                                    <div className="flex items-center gap-2 text-xs break-all">
                                      <FileTextOutlined className="text-base" />
                                      {uploadedFiles[0]?.name || 'scorp-nda-2025.txt'}
                                    </div>
                                  </Card>
                                </div>
                              ) : null
                            )}
                            {/* Staged summary system message */}
                            {idx === 0 && msg.role === 'assistant' && msg.content.startsWith('We detected that') && (
                              stagedStep === 1 ? (
                                <div className="flex justify-start w-full mt-4"><Spinner /></div>
                              ) : stagedStep > 1 ? (
                                <div className="flex justify-start w-full mt-4">
                                  <div
                                    className="px-4 py-3 rounded-2xl shadow-sm rounded-bl-md"
                                    style={{
                                      background: 'transparent',
                                      color: '#FFF',
                                      wordBreak: 'break-word',
                                      display: 'inline-block',
                                      maxWidth: '80%',
                                      minWidth: 48
                                    }}
                                  >
                                    We extracted some meta-data and custom properties from this document.
                                  </div>
                                </div>
                              ) : null
                            )}
                            {/* Staged summary card */}
                            {idx === 0 && msg.role === 'assistant' && msg.content.startsWith('We detected that') && (
                              stagedStep === 2 ? (
                                <div className="flex justify-start w-full mt-2"><Spinner /></div>
                              ) : stagedStep > 2 ? (
                                <div className="flex justify-start w-full mt-2">
                                  {/* Existing summary card code here */}
                                  <Card 
                                    size="small" 
                                    title={<span className="font-semibold text-sm flex items-center justify-between w-full">Summary and meta-data <ArrowRightOutlined /></span>} 
                                    style={{ 
                                      background: darkMode ? '#232326' : '#f5f5f7', 
                                      color: darkMode ? '#fff' : '#222', 
                                      borderRadius: 12, 
                                      width: '100%', 
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      border: showSummaryView ? '2px solid #FF5669' : (darkMode ? '1px solid transparent' : '1px solid transparent'),
                                      boxShadow: showSummaryView ? '0 0 0 2px #FF566955, 0 2px 8px 0 rgba(0,0,0,0.05)' : undefined
                                    }}
                                    className={
                                      `hover:shadow-md active:shadow-sm active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-[#FF5669] active:ring-2 active:ring-[#FF5669]` +
                                      (showSummaryView ? ' ring-2 ring-[#FF5669] shadow-md' : '')
                                    }
                                    onClick={handleSummaryCardClick}
                                    hoverable
                                  >
                                    <div className="space-y-3">
                                      {editableSummary.created && editableSummary.lastModified && (
                                        <div className="flex items-center gap-2 text-xs">
                                          <CalendarOutlined className="text-base" />
                                          <span>
                                            {dayjs(editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']).format('MMM D, YYYY')} - {dayjs(editableSummary.lastModified, ['MMMM D, YYYY', 'MMM D, YYYY']).format('MMM D, YYYY')}
                                          </span>
                                        </div>
                                      )}
                                      {editableSummary.tags.length > 0 && (
                                        <div className="flex items-center gap-2 text-xs">
                                          <TagsOutlined className="text-base" />
                                          <span>{editableSummary.tags.length} Tags</span>
                                        </div>
                                      )}
                                      {editableSummary.signers.filter(s => s.trim() !== '').length > 0 && (
                                        <div className="flex items-center gap-2 text-xs">
                                          <UserOutlined className="text-base" />
                                          <span>{editableSummary.signers.filter(s => s.trim() !== '').length} Signers</span>
                                        </div>
                                      )}
                                      {editableSummary.clauses.length > 0 && (
                                        <div className="flex items-center gap-2 text-xs">
                                          <FileTextOutlined className="text-base" />
                                          <span>{editableSummary.clauses.length} Clauses</span>
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                </div>
                              ) : null
                            )}
                          </React.Fragment>
                        ))}
                        {awaitingSignatories && (
                          <div className="w-full max-w-xl mx-auto mt-6 flex flex-col gap-2">
                            <Input
                              placeholder="Enter signatories (e.g., Alice Smith, Bob Lee)"
                              value={signatoriesInput}
                              onChange={e => setSignatoriesInput(e.target.value)}
                              onPressEnter={() => handleSignatoriesSubmit(false)}
                              size="large"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button type="primary" onClick={() => handleSignatoriesSubmit(false)} disabled={!signatoriesInput.trim()}>
                                Submit
                              </Button>
                              <Button onClick={() => handleSignatoriesSubmit(true)}>
                                Skip
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Chat input fixed at bottom */}
                  <div className="px-6 py-4 flex gap-2 items-center sticky bottom-0 z-10">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onPressEnter={handleSendChat}
                      disabled={uploading}
                      size="large"
                      style={{ borderRadius: 24 }}
                    />
                    <Button type="primary" onClick={handleSendChat} disabled={uploading || !chatInput.trim()} shape="circle" size="large" style={{ background: '#FF5669', border: 'none' }}>
                      <ArrowUpOutlined style={{ color: '#fff' }} />
                    </Button>
                  </div>
                </div>
                {/* Document panel */}
                <div className="w-3/5 flex flex-col h-full min-h-0">
                  {!showSummaryView && (
                    <div className="mb-4 px-5 py-3" style={{ borderBottom: darkMode ? '1px solid #333' : '1px solid #e5e7eb' }}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="font-bold text-lg dark:text-white">{uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Le Taco Truc - MSA 2025' : 'S-Corp Non-Disclosure Agreement 2025'}</div>
                          <Select
                            value={stage}
                            onChange={setStage}
                            style={{ minWidth: 120, borderRadius: 9999, background: darkMode ? 'rgba(255,255,255,0.08)' : '#f3f3f3', fontWeight: 600, height: 26, padding: '0 10px', fontSize: 14, lineHeight: '24px' }}
                            dropdownStyle={{ minWidth: 120 }}
                            bordered={false}
                            options={[
                              { label: 'Template', value: 'template' },
                              { label: 'Signing', value: 'signing' },
                              { label: 'Signed', value: 'signed' },
                              { label: 'Draft', value: 'draft' },
                            ]}
                            className="stage-badge-select"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="default" size="middle" disabled={showSummaryView && uploadedFiles[0]?.name !== 'scorp_letacotruck_msa (1).txt'}>Open Editor</Button>
                          {uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? (
                            <Button type="primary" size="middle" style={{ background: '#FF5669', border: 'none' }} disabled={false} onClick={() => setSaveModalOpen(true)}>Save</Button>
                          ) : (
                            <Button type="primary" size="middle" style={{ background: '#FF5669', border: 'none' }} onClick={() => setSaveModalOpen(true)} disabled={showSummaryView}>Save</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {showSummaryView ? (
                    <div className="flex-1 p-6 overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold dark:text-white">Document Summary</h2>
                        <div className="flex items-center gap-2">
                          <Button 
                            type="primary"
                            onClick={() => {
                              // Save changes
                              setMsaSummary({
                                created: editableSummary.created,
                                lastModified: editableSummary.lastModified,
                                status: editableSummary.status,
                                signers: editableSummary.signers,
                                tags: editableSummary.tags,
                              });
                              setMsaClauses(editableSummary.clauses);
                              // Close panel
                              setShowSummaryView(false);
                              // Show success message
                              message.success('Summary details saved successfully');
                            }}
                          >
                            Save
                          </Button>
                          <Button 
                            type="text" 
                            icon={<CloseOutlined />} 
                            onClick={() => {
                              // Reset to original values
                              setEditableSummary({
                                brief: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
                                  ? 'This Master Service Agreement (MSA) establishes a signed contract between S-Corp and Le Taco Truc for mobile catering services, including real lifecycle and signature data.'
                                  : 'This Non-Disclosure Agreement (NDA) is designed to protect confidential information shared between S-Corp and their clients. It covers various aspects of confidentiality including personal information, event details, and business relationships.',
                                created: msaSummary?.created || 'March 15, 2024',
                                lastModified: msaSummary?.lastModified || 'March 20, 2024',
                                status: msaSummary?.status || 'Template',
                                signers: msaSummary?.signers || [''],
                                tags: msaSummary?.tags || ['NDA', 'Template', 'Legal', 'Confidentiality', 'Client Services'],
                                clauses: msaClauses?.map(c => ({ heading: c.heading, text: c.text })) || [],
                              });
                              setShowSummaryView(false);
                            }} 
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <Card title="Brief Summary" size="small" bordered={false}>
                          <Input.TextArea
                            value={editableSummary.brief}
                            onChange={e => setEditableSummary(s => ({ ...s, brief: e.target.value }))}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            variant="borderless"
                            style={{ background: 'transparent', fontSize: '1em', padding: 0 }}
                          />
                        </Card>
                        <Card title="Lifecycle Data" size="small" bordered={false}>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center gap-2">
                              <span>Created:</span>
                              <DatePicker
                                value={editableSummary.created ? dayjs(editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']) : null}
                                onChange={(date) => setEditableSummary(s => ({ 
                                  ...s, 
                                  created: date ? date.format('MMM D, YYYY') : '' 
                                }))}
                                size="small"
                                format="MMM D, YYYY"
                                allowClear={false}
                                style={{ 
                                  maxWidth: 180, 
                                  background: 'transparent',
                                }}
                                className={`
                                  dark:bg-[#232326] dark:border-gray-700 
                                  hover:border-[#FF5669] focus:border-[#FF5669] 
                                  dark:hover:border-[#FF5669] dark:focus:border-[#FF5669]
                                `}
                                popupStyle={{
                                  background: darkMode ? '#1f1f1f' : '#ffffff',
                                }}
                                disabledDate={(current) => {
                                  if (!current) return false;
                                  return current.isAfter(dayjs());
                                }}
                              />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <span>Last Modified:</span>
                              <DatePicker
                                value={editableSummary.lastModified ? dayjs(editableSummary.lastModified, ['MMMM D, YYYY', 'MMM D, YYYY']) : null}
                                onChange={(date) => setEditableSummary(s => ({ 
                                  ...s, 
                                  lastModified: date ? date.format('MMM D, YYYY') : '' 
                                }))}
                                size="small"
                                format="MMM D, YYYY"
                                allowClear={false}
                                style={{ 
                                  maxWidth: 180, 
                                  background: 'transparent',
                                }}
                                className={`
                                  dark:bg-[#232326] dark:border-gray-700 
                                  hover:border-[#FF5669] focus:border-[#FF5669] 
                                  dark:hover:border-[#FF5669] dark:focus:border-[#FF5669]
                                `}
                                popupStyle={{
                                  background: darkMode ? '#1f1f1f' : '#ffffff',
                                }}
                                disabledDate={(current) => {
                                  if (!current) return false;
                                  const createdDate = editableSummary.created ? dayjs(editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']) : null;
                                  return current.isAfter(dayjs()) || Boolean(createdDate && current.isBefore(createdDate));
                                }}
                              />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <span>Status:</span>
                              <Input
                                value={editableSummary.status}
                                onChange={e => setEditableSummary(s => ({ ...s, status: e.target.value }))}
                                size="small"
                                variant="borderless"
                                style={{ maxWidth: 180, background: 'transparent', border: 'none', padding: 0 }}
                              />
                            </div>
                          </div>
                        </Card>
                        <Card title="Signers" size="small" bordered={false}>
                          <div className="flex flex-col gap-1">
                            {editableSummary.signers.map((signer, idx) => (
                              <Input
                                key={idx}
                                value={signer}
                                onChange={e => {
                                  const newSigners = [...editableSummary.signers];
                                  newSigners[idx] = e.target.value;
                                  setEditableSummary(s => ({ ...s, signers: newSigners }));
                                }}
                                size="small"
                                variant="borderless"
                                style={{ background: 'transparent', border: 'none', padding: 0 }}
                              />
                            ))}
                            <Button size="small" onClick={() => setEditableSummary(s => ({ ...s, signers: [...s.signers, ''] }))}>Add Signer</Button>
                          </div>
                        </Card>
                        <Card title="Main Tags" size="small" bordered={false}>
                          <div className="flex flex-wrap gap-2">
                            {editableSummary.tags.map((tag, idx) => (
                              <Input
                                key={idx}
                                value={tag}
                                onChange={e => {
                                  const newTags = [...editableSummary.tags];
                                  newTags[idx] = e.target.value;
                                  setEditableSummary(s => ({ ...s, tags: newTags }));
                                }}
                                size="small"
                                variant="borderless"
                                style={{ width: 120, background: 'transparent', border: 'none', padding: 0 }}
                              />
                            ))}
                            <Button size="small" onClick={() => setEditableSummary(s => ({ ...s, tags: [...s.tags, ''] }))}>Add Tag</Button>
                          </div>
                        </Card>
                        <Card title="Clauses" size="small" bordered={false}>
                          {editableSummary.clauses.length > 0 ? (
                            <div className="space-y-4">
                              {editableSummary.clauses.map((clause, idx) => (
                                <div key={idx} className="space-y-2">
                                  <Input
                                    value={clause.heading}
                                    onChange={e => {
                                      const newClauses = [...editableSummary.clauses];
                                      newClauses[idx].heading = e.target.value;
                                      setEditableSummary(s => ({ ...s, clauses: newClauses }));
                                    }}
                                    size="small"
                                    variant="borderless"
                                    style={{ fontWeight: 600, width: '100%', background: 'transparent', border: 'none', padding: 0 }}
                                    placeholder="Clause heading"
                                  />
                                  <Input.TextArea
                                    value={clause.text}
                                    onChange={e => {
                                      const newClauses = [...editableSummary.clauses];
                                      newClauses[idx].text = e.target.value;
                                      setEditableSummary(s => ({ ...s, clauses: newClauses }));
                                    }}
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    variant="borderless"
                                    style={{ background: 'transparent', fontSize: '0.9em', padding: 0 }}
                                    placeholder="Clause text"
                                  />
                                  {idx < editableSummary.clauses.length - 1 && (
                                    <div className="border-b border-gray-200 dark:border-gray-700 my-4" />
                                  )}
                                </div>
                              ))}
                              <Button 
                                size="small" 
                                onClick={() => setEditableSummary(s => ({ ...s, clauses: [...s.clauses, { heading: '', text: '' }] }))}
                                className="mt-4"
                              >
                                Add Clause
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="text-gray-400 text-sm">No clauses available</div>
                              <Button 
                                size="small" 
                                onClick={() => setEditableSummary(s => ({ ...s, clauses: [{ heading: '', text: '' }] }))}
                              >
                                Add Clause
                              </Button>
                            </div>
                          )}
                        </Card>
                        <div className="flex justify-end mt-4">
                          <Button type="primary" onClick={() => setEditing(false)}>Save</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-2xl p-6 shadow-inner overflow-y-auto whitespace-pre-line text-gray-900 dark:text-gray-100 min-h-0" style={{ minHeight: 0 }}>
                      {documentLoading ? (
                        <div className="text-gray-400 text-center mt-8">Generating document...</div>
                      ) : documentContent ? (
                        <div
                          style={{
                            transition: 'opacity 0.3s',
                            opacity: fade ? 1 : 0,
                            height: '100%',
                          }}
                        >
                          {showFormatted ? (
                            <>
                              <div style={{ whiteSpace: 'pre-line', color: darkMode ? '#fff' : '#222', fontSize: '1em', fontFamily: 'inherit' }}>{documentContent}</div>
                            </>
                          ) : (
                            <div style={{ whiteSpace: 'pre-line', color: darkMode ? '#fff' : '#222', fontSize: '1em', fontFamily: 'inherit' }}>{documentContent}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-center mt-8 whitespace-pre-line">{NDA_MODEL}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {/* Always render file input and upload modal so upload works everywhere */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <input
              type="file"
              ref={singleFileInputRef}
              style={{ display: 'none' }}
              onChange={handleSingleFileChange}
              accept=".txt,.md,.csv,.json,.log,.rtf,.html,.xml"
            />
            <input
              type="file"
              ref={signedTestFileInputRef}
              style={{ display: 'none' }}
              onChange={handleSignedTestFileChange}
              accept=".txt,.md,.csv,.json,.log,.rtf,.html,.xml"
            />
            <Modal
              title="Confirm Upload"
              open={uploadModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              okText={uploading ? 'Uploading...' : 'Upload'}
              cancelText="Cancel"
              okButtonProps={{ disabled: uploading, loading: uploading }}
              cancelButtonProps={{ disabled: uploading }}
              styles={{ body: { maxHeight: '50vh', overflowY: 'auto' } }}
            >
              <div style={{ marginBottom: 12, fontWeight: 500 }}>
                {uploadedFiles.length} document{uploadedFiles.length === 1 ? '' : 's'} selected
              </div>
              <ul style={{ maxHeight: 15 * 36 + 8, overflowY: 'auto', paddingRight: 4 }}>
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, minHeight: 36 }}>
                    <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                    <Button size="small" danger onClick={() => handleRemoveFile(idx)} disabled={uploading} style={{ marginLeft: 8 }} icon={<CloseOutlined />} />
                  </li>
                ))}
              </ul>
              {uploadedFiles.length === 0 && <div>No files selected.</div>}
            </Modal>
            <Modal
              title="Send for Signature"
              open={signatureModalOpen}
              onCancel={() => setSignatureModalOpen(false)}
              onOk={() => {/* handle send logic here */ setSignatureModalOpen(false);}}
              okText="Send"
              cancelText="Cancel"
            >
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Select S-Corp signer</div>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Choose signer"
                  value={selectedSigner}
                  onChange={setSelectedSigner}
                >
                  {sCorpEmployees.map(emp => (
                    <Select.Option key={emp} value={emp}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar src={sCorpEmployeeAvatars[emp]} size="small" style={{ verticalAlign: 'middle' }} />
                        {emp}
                      </span>
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Client email</div>
                <Input
                  type="email"
                  placeholder="client@email.com"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                />
              </div>
              <div>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>Message</div>
                <Input.TextArea
                  placeholder="Write a custom message..."
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </Modal>
            <Modal
              title="Select a folder to save your document"
              open={saveModalOpen}
              onCancel={() => setSaveModalOpen(false)}
              onOk={() => { setSaveModalOpen(false); /* handle save logic here */ }}
              okText="Save"
              cancelText="Cancel"
            >
              <Tree
                treeData={folderTreeData}
                selectedKeys={selectedFolder ? [selectedFolder] : []}
                onSelect={keys => setSelectedFolder(keys[0] as string)}
                showLine={false}
                showIcon
                height={400}
                switcherIcon={({ expanded }) => expanded ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'inline', verticalAlign: 'middle' }}><polygon points="2,3 8,3 5,8" fill="currentColor" /></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'inline', verticalAlign: 'middle' }}><polygon points="3,2 8,5 3,8" fill="currentColor" /></svg>
                )}
              />
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
