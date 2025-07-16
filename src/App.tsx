import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Table, Tag, Avatar, Dropdown, Space, ConfigProvider, theme as antdTheme, Segmented, Select, Modal, Upload, message, Card, Collapse, Tree, Skeleton, DatePicker, Tabs, Alert, Checkbox } from 'antd';
import { PlusOutlined, UserOutlined, BellOutlined, FileTextOutlined, SettingOutlined, LogoutOutlined, BulbOutlined, BulbFilled, ArrowUpOutlined, PaperClipOutlined, CloseOutlined, MessageOutlined, ArrowRightOutlined, FolderOutlined, DownOutlined, RightOutlined, CalendarOutlined, TagsOutlined, FileZipOutlined, FolderOpenOutlined, CheckOutlined, EditOutlined, InfoCircleOutlined, ExportOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import dayjs from 'dayjs';
import JSZip from 'jszip';
import type { DataNode } from 'antd/es/tree';

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
  { 
    key: 'bulk-zip', 
    label: (
      <div>
        <div className="flex items-center">
          <FileZipOutlined style={{ marginRight: 6 }} />
          <span>Bulk upload</span>
          <Tag color="green" style={{ marginLeft: 8, fontSize: 10 }}>AI Enhanced</Tag>
        </div>
        <div className="text-xs text-gray-500 mt-1">Auto-extract & organize documents</div>
      </div>
    ) 
  },
  { key: 'docusign', label: 'Import from Docusign', disabled: true }
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
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant' | 'card' | 'system-progress', content: string }[]>([]);
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
  const [showDocumentView, setShowDocumentView] = useState(true);
  const [msaSummary, setMsaSummary] = useState<{
    title: string;
    created: string;
    lastModified: string;
    effectiveDate: string;
    renewalDate: string;
    status: string;
    signers: string[];
    thirdParties: string[];
    tags: string[];
    agreementCategory: string;
    documentType: string;
    totalAgreementValue: string;
    totalAgreementDescription: string;
  } | null>(null);
  const [msaClauses, setMsaClauses] = useState<{ heading: string, text: string }[]>([]);
  const sCorpEmployees = [
    'Alice Smith', 'Bob Lee', 'Charlie Kim', 'Diana Patel', 'Evan Chen',
    'Fiona Garcia', 'George Brown', 'Hannah Wilson', 'Ivan Martinez', 'Julia Clark',
    'Kevin Lewis', 'Laura Young', 'Mike Turner', 'Nina Scott', 'Oscar Adams'
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const singleFileInputRef = React.useRef<HTMLInputElement>(null);
  const zipFileInputRef = React.useRef<HTMLInputElement>(null);

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
    if (key === 'single') {
      if (singleFileInputRef.current) {
        singleFileInputRef.current.value = '';
        singleFileInputRef.current.click();
      }
    } else if (key === 'bulk-zip') {
      if (zipFileInputRef.current) {
        zipFileInputRef.current.value = '';
        zipFileInputRef.current.click();
      }
    } else if (key === 'docusign') {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
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
    // Set initial document title
    setDocumentTitle('S-Corp Non-Disclosure Agreement 2025');
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
    setShowDocumentView(false);
    setIsDocumentPanelVisible(true);
  };

  // Add click handler for the document card
  const handleDocumentCardClick = () => {
    setShowSummaryView(false);
    setShowDocumentView(true);
    setIsDocumentPanelVisible(true);
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
  interface EditableSummary {
    title: string;
    brief: string;
    created: string;
    lastModified: string;
    effectiveDate: string;
    renewalDate: string;
    status: string;
    thirdParties: string[];
    tags: string[];
    clauses: { heading: string; text: string; }[];
    newTag: string;
    agreementCategory: string;
    documentType: string;
    totalAgreementValue: string;
    totalAgreementDescription: string;
  }

  const [editableSummary, setEditableSummary] = useState<EditableSummary>({
    title: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
      ? 'Master Service Agreement - Le Taco Truc'
      : 'Non-Disclosure Agreement',
    brief: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
      ? 'This Master Service Agreement (MSA) establishes a signed contract between S-Corp and Le Taco Truc for mobile catering services, including real lifecycle and signature data.'
      : 'This Non-Disclosure Agreement (NDA) is designed to protect confidential information shared between S-Corp and their clients. It covers various aspects of confidentiality including personal information, event details, and business relationships.',
    created: msaSummary?.created || 'March 15, 2024',
    lastModified: msaSummary?.lastModified || 'March 20, 2024',
    effectiveDate: msaSummary?.effectiveDate || 'March 15, 2024',
    renewalDate: msaSummary?.renewalDate || 'March 15, 2024',
    status: msaSummary?.status || 'Template',
    thirdParties: msaSummary?.thirdParties || ['Le Taco Truc', 'Acme Corp'],
    tags: msaSummary?.tags || ['NDA', 'Template', 'Legal', 'Confidentiality', 'Client Services'],
    clauses: msaClauses?.map(c => ({ heading: c.heading, text: c.text })) || [],
    newTag: '',
    agreementCategory: msaSummary?.agreementCategory || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Service Agreement' : 'Confidentiality'),
    documentType: msaSummary?.documentType || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Master Service Agreement' : 'Non-Disclosure Agreement'),
    totalAgreementValue: msaSummary?.totalAgreementValue || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? '$30,000' : 'N/A'),
    totalAgreementDescription: msaSummary?.totalAgreementDescription || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Base service fee of $2,500 per event (estimated 12 events annually)' : 'No monetary value - confidentiality agreement'),
  });
  const [editing, setEditing] = useState(false);

  // Add effect to reset editableSummary when msaSummary, msaClauses, or uploadedFiles change
  React.useEffect(() => {
    setEditableSummary({
      title: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
        ? 'Master Service Agreement - Le Taco Truc'
        : 'Non-Disclosure Agreement',
      brief: uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
        ? 'This Master Service Agreement (MSA) establishes a signed contract between S-Corp and Le Taco Truc for mobile catering services, including real lifecycle and signature data.'
        : 'This Non-Disclosure Agreement (NDA) is designed to protect confidential information shared between S-Corp and their clients. It covers various aspects of confidentiality including personal information, event details, and business relationships.',
      created: msaSummary?.created || 'March 15, 2024',
      lastModified: msaSummary?.lastModified || 'March 20, 2024',
      effectiveDate: msaSummary?.effectiveDate || 'March 15, 2024',
      renewalDate: msaSummary?.renewalDate || 'March 15, 2024',
      status: msaSummary?.status || 'Template',
      thirdParties: msaSummary?.thirdParties || ['Le Taco Truc', 'Acme Corp'],
      tags: msaSummary?.tags || ['NDA', 'Template', 'Legal', 'Confidentiality', 'Client Services'],
      clauses: msaClauses?.map(c => ({ heading: c.heading, text: c.text })) || [],
      newTag: '',
      agreementCategory: msaSummary?.agreementCategory || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Service Agreement' : 'Confidentiality'),
      documentType: msaSummary?.documentType || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Master Service Agreement' : 'Non-Disclosure Agreement'),
      totalAgreementValue: msaSummary?.totalAgreementValue || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? '$30,000' : 'N/A'),
      totalAgreementDescription: msaSummary?.totalAgreementDescription || (uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt' ? 'Base service fee of $2,500 per event (estimated 12 events annually)' : 'No monetary value - confidentiality agreement'),
    });
  }, [msaSummary, msaClauses, uploadedFiles]);

  // Add state for save type modal
  const [saveTypeModalOpen, setSaveTypeModalOpen] = useState(false);
  const [selectedSaveType, setSelectedSaveType] = useState<'concord' | 'word' | null>(null);

  // Add state for Save in Concord modal (for all stages)
  const [saveConcordModalOpen, setSaveConcordModalOpen] = useState(false);
  const [selectedConcordType, setSelectedConcordType] = useState<'live' | 'word' | null>(null);

  // Update handleFileChange to only handle single file uploads or fallback
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // You can keep single file upload logic here if needed, or leave empty if not used
  };

  // Add state for selected ZIP file
  const [selectedZipFile, setSelectedZipFile] = useState<File | null>(null);

  // Add handler for ZIP file selection
  const handleZipFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/zip' && !file.name.toLowerCase().endsWith('.zip')) {
      message.error('Please select a valid .zip file.');
      return;
    }
    setSelectedZipFile(file);
    setSelectedPage('chat');
    // Parse ZIP and build tree
    try {
      const zip = await JSZip.loadAsync(file);
      const tree = buildTreeFromZip(zip);
      setBulkUploadTreeData(tree);
      // Count real docs/folders
      const { docCount, folderCount } = countDocsAndFolders(tree);
      setBulkUploadDocCount(docCount);
      setBulkUploadFolderCount(folderCount);
      setBulkUploadTotal(docCount);
    } catch (err) {
      message.error('Failed to read ZIP file.');
      setBulkUploadTreeData([]);
      setBulkUploadDocCount(0);
      setBulkUploadFolderCount(0);
      setBulkUploadTotal(0);
    }
  };

  // Add state for bulk upload simulation
  const [bulkUploadActive, setBulkUploadActive] = useState(false);
  const [bulkUploadDocCount, setBulkUploadDocCount] = useState(0);
  const [bulkUploadFolderCount, setBulkUploadFolderCount] = useState(0);
  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);
  const [bulkUploadLog, setBulkUploadLog] = useState<string[]>([]);
  const [bulkUploadTotal, setBulkUploadTotal] = useState(0);
  const [bulkUploadAnimating, setBulkUploadAnimating] = useState(false);

  // Add state for toggling between log and tree view
  const [showBulkTree, setShowBulkTree] = useState(false);
  // Mock file/folder tree data for ZIP contents
  const [bulkUploadTreeData, setBulkUploadTreeData] = useState<DataNode[]>([]);

  // Add states for enhanced bulk upload with auto-extraction
  const [bulkAnalysisProgress, setBulkAnalysisProgress] = useState(0);
  const [bulkAnalysisActive, setBulkAnalysisActive] = useState(false);
  const [bulkExtractedData, setBulkExtractedData] = useState<{
    [key: string]: {
      docType: string;
      parties: string[];
      dates: { effective?: string; renewal?: string; expiry?: string; signed?: string };
      confidence: number;
      suggestedFolder: string;
      status: 'pending' | 'template' | 'signed' | 'draft';
      extractedClauses: number;
      keyTerms: string[];
      agreementCategory: string;
      totalAgreementValue: string;
      totalAgreementDescription: string;
      signers: string[];
      originalPath: string;
    }
  }>({});
  const [showBulkReview, setShowBulkReview] = useState(false);
  const [bulkReviewTab, setBulkReviewTab] = useState<'table' | 'folders'>('table');
  const [bulkImportCompleted, setBulkImportCompleted] = useState(false);
  const [currentFolderPath, setCurrentFolderPath] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  // Simulate ZIP processing and upload when selectedZipFile is set
  useEffect(() => {
    if (
      selectedZipFile &&
      bulkUploadDocCount > 0 &&
      bulkUploadTotal > 0 &&
      bulkUploadFolderCount >= 0
    ) {
      setBulkUploadProgress(0);
      setBulkUploadLog([]);
      setBulkUploadActive(true);
      setBulkUploadAnimating(true);
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Bulk upload started for ${bulkUploadDocCount} documents in ${bulkUploadFolderCount} folders. AI will automatically extract document information, classify documents, and suggest organization.` },
        { role: 'system-progress', content: 'Document upload in progress' }
      ]);
      let progress = 0;
      const log: string[] = [];
      function uploadNext() {
        if (progress < bulkUploadTotal) {
          setTimeout(() => {
            progress++;
            log.push(`Uploaded document ${progress} of ${bulkUploadTotal}`);
            setBulkUploadProgress(progress);
            setBulkUploadLog([...log]);
            uploadNext();
          }, 800);
        } else {
          setBulkUploadAnimating(false);
          log.push('All documents uploaded successfully.');
          setBulkUploadLog([...log]);
          setChatMessages(prev => prev.map(m =>
            m.role === 'system-progress'
              ? { ...m, content: `${bulkUploadTotal} / ${bulkUploadTotal} documents uploaded successfully` }
              : m
          ));
        }
      }
      uploadNext();
    } else if (!selectedZipFile) {
      setBulkUploadActive(false);
      setBulkUploadAnimating(false);
      setBulkUploadDocCount(0);
      setBulkUploadFolderCount(0);
      setBulkUploadProgress(0);
      setBulkUploadLog([]);
      setBulkUploadTotal(0);
    }
    // eslint-disable-next-line
  }, [selectedZipFile, bulkUploadDocCount, bulkUploadTotal, bulkUploadFolderCount]);

  // Add function to analyze documents after upload
  const analyzeBulkDocuments = async () => {
    setBulkAnalysisActive(true);
    setBulkAnalysisProgress(0);
    // Start with empty data - we'll build it progressively
    setBulkExtractedData({});
    
    // Enhanced realistic document analysis
    const companies = ['Acme Corp', 'Tech Solutions Inc', 'Global Services Ltd', 'Innovation Partners', 'Digital Ventures', 'Le Taco Truc', 'Stellar Systems', 'Prime Logistics'];
    const employees = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emma Davis', 'Robert Wilson'];
    const categories = ['Service Agreement', 'Confidentiality', 'Employment', 'Sales', 'Partnership', 'Vendor Agreement'];
    const docTypesByCategory: Record<string, string[]> = {
      'Service Agreement': ['Master Service Agreement', 'Service Level Agreement', 'Consulting Agreement'],
      'Confidentiality': ['Non-Disclosure Agreement', 'Mutual NDA', 'Employee NDA'],
      'Employment': ['Employment Contract', 'Contractor Agreement', 'Offer Letter'],
      'Sales': ['Sales Agreement', 'Purchase Order', 'Supply Agreement'],
      'Partnership': ['Partnership Agreement', 'Joint Venture Agreement', 'Collaboration Agreement'],
      'Vendor Agreement': ['Vendor Contract', 'Supplier Agreement', 'Procurement Agreement']
    };
    
    // Generate folder structure based on actual files
    const folderStructure: Record<string, any> = {
      '2024 Contracts': [],
      '2023 Contracts': [],
      'Active Agreements': {
        'Service Contracts': [],
        'NDAs': [],
        'Employment': [],
        'Vendor Agreements': []
      },
      'Templates': [],
      'Archived': []
    };
    
    let analyzed = 0;
    const analyzeNext = () => {
      if (analyzed < bulkUploadTotal) {
              setTimeout(() => {
        analyzed++;
        // Start showing the review tabs as soon as we have some data
        if (analyzed === 1) {
          setShowBulkReview(true);
        }
        const isTemplate = Math.random() > 0.8;
          const isSigned = !isTemplate && Math.random() > 0.3;
          const category = categories[Math.floor(Math.random() * categories.length)];
          const docType = docTypesByCategory[category][Math.floor(Math.random() * docTypesByCategory[category].length)];
          const company = companies[Math.floor(Math.random() * companies.length)];
          const year = isSigned ? (Math.random() > 0.5 ? '2024' : '2023') : '2024';
          
          // Generate realistic file path
          const fileName = isTemplate 
            ? `${docType.replace(/ /g, '_')}_Template.pdf`
            : `${company.replace(/ /g, '_')}_${docType.replace(/ /g, '_')}_${year}.pdf`;
          
          const originalPath = isTemplate
            ? `Templates/${fileName}`
            : `${year}/${category.replace(/ /g, '_')}/${fileName}`;
          
          // Determine suggested folder based on status and type
          let suggestedFolder = '';
          if (isTemplate) {
            suggestedFolder = 'Templates';
          } else if (isSigned) {
            suggestedFolder = year === '2024' ? `Active Agreements/${category}` : 'Archived';
          } else {
            suggestedFolder = '2024 Contracts/Drafts';
          }
          
          const newData = {
            docType: docType,
            parties: isSigned ? [company, 'S-Corp Inc.'] : ['[Party 1]', '[Party 2]'],
            dates: {
              effective: year + '-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
              renewal: (parseInt(year) + 1) + '-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
              expiry: (parseInt(year) + 2) + '-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
              signed: isSigned ? year + '-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0') : undefined
            },
            confidence: isTemplate ? 100 : (isSigned ? 85 + Math.floor(Math.random() * 15) : 70 + Math.floor(Math.random() * 20)),
            suggestedFolder: suggestedFolder,
            status: (isTemplate ? 'template' : (isSigned ? 'signed' : 'draft')) as 'pending' | 'template' | 'signed' | 'draft',
            extractedClauses: Math.floor(Math.random() * 15) + 8,
            keyTerms: ['confidentiality', 'liability', 'termination', 'payment terms', 'intellectual property'].slice(0, Math.floor(Math.random() * 3) + 2),
            agreementCategory: category,
            totalAgreementValue: isSigned ? 
              (category === 'Sales' || category === 'Service Agreement' ? 
                '$' + (Math.floor(Math.random() * 900) + 100) + ',000' : 
                'N/A') : 'TBD',
            totalAgreementDescription: isSigned ?
              (category === 'Sales' ? 'Annual purchase commitment' :
               category === 'Service Agreement' ? 'Monthly retainer + hourly rates' :
               'Non-monetary agreement') : 'To be determined',
            signers: isSigned ? 
              [employees[Math.floor(Math.random() * employees.length)] + ' (S-Corp)', 
               'Authorized Representative (' + company + ')'] : 
              [],
            originalPath: originalPath
          };
          // Update state progressively - add one document at a time
          setBulkExtractedData(prev => ({
            ...prev,
            [fileName]: newData
          }));
          setBulkAnalysisProgress(analyzed);
          analyzeNext();
                  }, 150); // Slow down to show progressive building better
      } else {
        setBulkAnalysisActive(false);
        console.log('Analysis complete');
      }
    };
    analyzeNext();
  };

  // Start analysis immediately when upload starts
  useEffect(() => {
    if (bulkUploadActive && bulkUploadTotal > 0 && !bulkAnalysisActive && Object.keys(bulkExtractedData).length === 0) {
      // Start analysis immediately, don't wait for upload to complete
      analyzeBulkDocuments();
    }
  }, [bulkUploadActive, bulkUploadTotal, bulkAnalysisActive, bulkExtractedData]);

  // Helper to build AntD tree from JSZip files
  function buildTreeFromZip(zip: JSZip): DataNode[] {
    const root: any = {};
    Object.values(zip.files).forEach(file => {
      const parts = file.name.split('/').filter(Boolean);
      let node = root;
      parts.forEach((part, idx) => {
        if (!node[part]) {
          node[part] = idx === parts.length - 1 && !file.dir
            ? { __file: true, file } : {};
        }
        node = node[part];
      });
    });
    function toTree(node: any, path = ''): DataNode[] {
      return Object.entries(node).map(([name, value], i) => {
        const key = path ? `${path}/${name}` : name;
        if ((value as any).__file) {
          return {
            title: name,
            key,
            icon: <FileTextOutlined />,
          };
        } else {
          return {
            title: name,
            key,
            icon: <FolderOpenOutlined />,
            children: toTree(value, key),
          };
        }
      });
    }
    return toTree(root);
  }

  // Render a system progress card in the chat panel for bulk upload
  const renderBulkUploadSystemCard = () => (
    <div className="flex justify-start w-full mt-2">
      <Card
        size="small"
        title={
          <span className="font-semibold text-sm flex items-center justify-between w-full">
            {bulkUploadAnimating || bulkAnalysisActive
              ? `Processing documents... (${bulkAnalysisProgress}/${bulkUploadTotal} analyzed)`
              : showBulkReview
              ? `Review and organize ${bulkUploadTotal} documents`
              : `${bulkUploadProgress} / ${bulkUploadTotal} documents uploaded successfully`}
            <ArrowRightOutlined
              className="ml-2 cursor-pointer"
              rotate={showBulkTree || showBulkReview ? 90 : 0}
              onClick={() => {
                if (showBulkReview) {
                  // Don't toggle tree view when in review mode
                  return;
                }
                setShowBulkTree(t => !t);
              }}
            />
          </span>
        }
        style={{
          background: darkMode ? '#232326' : '#f5f5f7',
          color: darkMode ? '#fff' : '#222',
          borderRadius: 12,
          width: '100%',
          marginBottom: 24,
          cursor: 'pointer',
          border: (showBulkTree || showBulkReview) ? '2px solid #FF5669' : (darkMode ? '1px solid transparent' : '1px solid transparent'),
          boxShadow: (showBulkTree || showBulkReview) ? '0 0 0 2px #FF566955, 0 2px 8px 0 rgba(0,0,0,0.05)' : undefined
        }}
        className={
          `hover:shadow-md active:shadow-sm active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-[#FF5669] active:ring-2 active:ring-[#FF5669]` +
          ((showBulkTree || showBulkReview) ? ' ring-2 ring-[#FF5669] shadow-md' : '')
        }
        onClick={() => {
          if (showBulkReview) return;
          setShowBulkTree(t => !t);
        }}
        hoverable
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <FileZipOutlined className="text-base" />
            {selectedZipFile?.name}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <FolderOpenOutlined className="text-base" />
            {bulkUploadFolderCount} Folders
          </div>
          <div className="flex items-center gap-2 text-xs">
            <FileTextOutlined className="text-base" />
            {bulkUploadDocCount} Documents
          </div>
          
          {/* Combined Progress Bars */}
          {(bulkUploadAnimating || bulkAnalysisActive || bulkUploadProgress < bulkUploadTotal) && (
            <div className="space-y-2">
              {/* Upload Progress */}
              <div>
                <div className="text-xs mb-1 flex items-center justify-between">
                  <span>Uploading documents...</span>
                  <span className="text-gray-500">{bulkUploadProgress}/{bulkUploadTotal}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#FF5669] h-2 rounded-full transition-all duration-700"
                    style={{ width: `${bulkUploadTotal ? (bulkUploadProgress / bulkUploadTotal) * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              {/* Analysis Progress */}
              <div>
                <div className="text-xs mb-1 flex items-center justify-between">
                  <span>AI analyzing content...</span>
                  <span className="text-gray-500">{bulkAnalysisProgress}/{bulkUploadTotal}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${bulkUploadTotal ? (bulkAnalysisProgress / bulkUploadTotal) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Review Ready Indicator */}
          {showBulkReview && (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <CheckOutlined className="text-base" />
              Analysis complete - Ready for review
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  // Removed bulk upload folder selection - now handled in the review interface

  // Add state for document title editing in chat
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentSaveType, setDocumentSaveType] = useState<'live' | 'word'>('live');
  
  // Add state for document panel visibility
  const [isDocumentPanelVisible, setIsDocumentPanelVisible] = useState(true);

  // Helper to count real documents and folders from the ZIP tree
  function countDocsAndFolders(tree: DataNode[]): { docCount: number; folderCount: number } {
    let docCount = 0;
    let folderCount = 0;
    function traverse(nodes: DataNode[]) {
      for (const node of nodes) {
        if (node.children && node.children.length > 0) {
          folderCount++;
          traverse(node.children);
        } else {
          docCount++;
        }
      }
    }
    traverse(tree);
    return { docCount, folderCount };
  }

  // Clear bulk upload state on hard refresh
  useEffect(() => {
    const clearBulkUpload = () => {
      setSelectedZipFile(null);
      setBulkUploadDocCount(0);
      setBulkUploadFolderCount(0);
      setBulkUploadProgress(0);
      setBulkUploadLog([]);
      setBulkUploadTotal(0);
      setBulkUploadAnimating(false);
      setBulkUploadActive(false);
      setBulkUploadTreeData([]);
      setShowBulkTree(false);

      setBulkAnalysisProgress(0);
            setBulkAnalysisActive(false);
      setBulkExtractedData({});
      setShowBulkReview(false);
      setBulkReviewTab('table');
      setBulkImportCompleted(false);
      setCurrentFolderPath([]);
      setSelectedFiles(new Set());
    };
    window.addEventListener('load', clearBulkUpload);
    return () => window.removeEventListener('load', clearBulkUpload);
  }, []);

  // Add function to handle stage changes
  const handleStageChange = (newStage: string) => {
    setStage(newStage);
    // If stage is signed, automatically set document type to word
    if (newStage === 'signed') {
      setDocumentSaveType('word');
    }
    // Removed system message for stage change to keep chat clean
  };

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
                <div className={`${isDocumentPanelVisible ? 'w-2/5 border-r border-gray-200 dark:border-gray-800' : 'w-full max-w-4xl mx-auto'} flex flex-col relative h-full min-h-0`}>
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
                            {/* Bulk upload system progress card as second message */}
                            {selectedZipFile && msg.role === 'system-progress' && idx === 1 && renderBulkUploadSystemCard()}


                            {/* Staged file card */}
                            {idx === 0 && msg.role === 'assistant' && msg.content.startsWith('We detected that') && (
                              stagedStep === 0 ? (
                                <div className="flex justify-start w-full mt-2"><Spinner /></div>
                              ) : stagedStep > 0 ? (
                                <div className="flex justify-start w-full mt-2">
                                  <div className="flex flex-col gap-3 w-full">
                                    {/* Editable settings card */}
                                    <Card
                                      size="small"
                                      title={
                                        <div className="flex items-center gap-2 text-sm">
                                          <EditOutlined className="text-[#FF5669]" />
                                          <span>Document Settings</span>
                                          <span className="text-xs text-gray-400 font-normal ml-2">(You can modify these)</span>
                                        </div>
                                      }
                                      style={{
                                        background: darkMode ? 'rgba(255, 86, 105, 0.05)' : 'rgba(255, 86, 105, 0.02)',
                                        borderColor: darkMode ? 'rgba(255, 86, 105, 0.2)' : 'rgba(255, 86, 105, 0.15)',
                                        borderRadius: 12,
                                      }}
                                      className="w-full"
                                    >
                                      <div className="space-y-3">
                                        {/* Title field */}
                                        <div>
                                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
                                          <Input
                                            value={documentTitle}
                                            onChange={(e) => setDocumentTitle(e.target.value)}
                                            placeholder="Enter document title"
                                            prefix={<EditOutlined className="text-gray-400" />}
                                            style={{
                                              background: darkMode ? 'rgba(255,255,255,0.08)' : '#fff',
                                              borderRadius: 8,
                                              border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb'
                                            }}
                                            size="middle"
                                          />
                                        </div>

                                        {/* Stage and Type row */}
                                        <div className="grid grid-cols-2 gap-3">
                                          <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Stage</label>
                                            <Select
                                              value={stage}
                                              onChange={handleStageChange}
                                              style={{ 
                                                width: '100%',
                                                borderRadius: 8
                                              }}
                                              options={[
                                                { label: 'Template', value: 'template' },
                                                { label: 'Signed', value: 'signed' },
                                                { label: 'Draft', value: 'draft' },
                                              ]}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Document Type</label>
                                            <Select
                                              value={documentSaveType}
                                              onChange={setDocumentSaveType}
                                              disabled={stage === 'signed'}
                                              style={{ 
                                                width: '100%',
                                                borderRadius: 8
                                              }}
                                              options={[
                                                { label: '📄 Live document', value: 'live' },
                                                { label: '📝 Word document', value: 'word' },
                                              ]}
                                            />
                                            {stage === 'signed' && (
                                              <div className="text-xs text-gray-400 mt-1">
                                                Signed documents can only be saved as Word documents
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Folder selection */}
                                        <div>
                                          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Destination Folder</label>
                                          <div className="flex items-center gap-2">
                                            <Button 
                                              icon={<FolderOutlined />}
                                              onClick={() => setSaveModalOpen(true)}
                                              style={{
                                                borderRadius: 8,
                                                flex: 1,
                                                textAlign: 'left',
                                                justifyContent: 'flex-start'
                                              }}
                                            >
                                              {selectedFolder || 'Select folder'}
                                            </Button>
                                            {selectedFolder && (
                                              <Button
                                                type="text"
                                                icon={<CloseOutlined />}
                                                onClick={() => setSelectedFolder(null)}
                                                size="small"
                                              />
                                            )}
                                          </div>
                                        </div>

                                        {/* Save in Concord button - only show when folder is selected */}
                                        {selectedFolder && (
                                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                            <Button
                                              type="primary"
                                              size="large"
                                              block
                                              style={{ 
                                                background: '#FF5669', 
                                                border: 'none',
                                                borderRadius: 8,
                                                height: 40,
                                                fontWeight: 500
                                              }}
                                              onClick={() => {
                                                // Save directly with selected options
                                                setSelectedConcordType(documentSaveType);
                                                message.success(`Document saved to ${selectedFolder} as ${documentSaveType === 'live' ? 'Live document' : 'Word document'}`);
                                                setTimeout(() => setSelectedPage('dashboard'), 1000);
                                              }}
                                            >
                                              Save in Concord
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </Card>

                                    {/* Two read-only cards side by side */}
                                    <div className="grid grid-cols-2 gap-3">
                                      {/* Contract card */}
                                      <Card 
                                        size="small" 
                                        title={
                                          <span className="font-semibold text-sm flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                              <FileTextOutlined className="text-gray-400" />
                                              <span>Agreement</span>
                                              <span className="text-xs text-gray-400 font-normal">(Read-only)</span>
                                            </div>
                                          </span>
                                        }
                                        style={{ 
                                          background: darkMode ? '#232326' : '#f5f5f7', 
                                          color: darkMode ? '#fff' : '#222', 
                                          borderRadius: 12, 
                                          cursor: 'pointer',
                                          transition: 'all 0.2s ease',
                                          border: showDocumentView && !showSummaryView ? '2px solid #FF5669' : (darkMode ? '1px solid transparent' : '1px solid transparent'),
                                          boxShadow: showDocumentView && !showSummaryView ? '0 0 0 2px #FF566955, 0 2px 8px 0 rgba(0,0,0,0.05)' : undefined,
                                          height: '100%'
                                        }}
                                        className={
                                          `hover:shadow-md active:shadow-sm active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-[#FF5669] active:ring-2 active:ring-[#FF5669]` +
                                          (showDocumentView && !showSummaryView ? ' ring-2 ring-[#FF5669] shadow-md' : '')
                                        }
                                        onClick={handleDocumentCardClick}
                                        hoverable
                                      >
                                        <div className="space-y-3">
                                          <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Title</div>
                                            <div className="text-sm font-medium">
                                              {documentTitle || editableSummary.title || 'S-Corp Non-Disclosure Agreement 2025'}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Third Party</div>
                                            <div className="text-sm">
                                              {editableSummary.thirdParties?.length > 0 ? editableSummary.thirdParties.join(', ') : 'No third parties'}
                                            </div>
                                          </div>
                                        </div>
                                      </Card>

                                      {/* Metadata card */}
                                      <Card 
                                        size="small" 
                                        title={
                                          <span className="font-semibold text-sm flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                              <InfoCircleOutlined className="text-gray-400" />
                                              <span>Metadata</span>
                                              <span className="text-xs text-gray-400 font-normal">(Read-only)</span>
                                            </div>
                                          </span>
                                        } 
                                        style={{ 
                                          background: darkMode ? '#232326' : '#f5f5f7', 
                                          color: darkMode ? '#fff' : '#222', 
                                          borderRadius: 12, 
                                          cursor: 'pointer',
                                          transition: 'all 0.2s ease',
                                          border: showSummaryView ? '2px solid #FF5669' : (darkMode ? '1px solid transparent' : '1px solid transparent'),
                                          boxShadow: showSummaryView ? '0 0 0 2px #FF566955, 0 2px 8px 0 rgba(0,0,0,0.05)' : undefined,
                                          height: '100%'
                                        }}
                                        className={
                                          `hover:shadow-md active:shadow-sm active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-[#FF5669] active:ring-2 active:ring-[#FF5669]` +
                                          (showSummaryView ? ' ring-2 ring-[#FF5669] shadow-md' : '')
                                        }
                                        onClick={handleSummaryCardClick}
                                        hoverable
                                      >
                                        <div className="space-y-2">
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
                                          {editableSummary.clauses.length > 0 && (
                                            <div className="flex items-center gap-2 text-xs">
                                              <FileTextOutlined className="text-base" />
                                              <span>{editableSummary.clauses.length} Clauses</span>
                                            </div>
                                          )}
                                        </div>
                                      </Card>
                                    </div>
                                  </div>
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
                {isDocumentPanelVisible && (
                <div className="w-3/5 flex flex-col h-full min-h-0 relative">
                  {/* Close button */}
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setIsDocumentPanelVisible(false)}
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 10,
                      background: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  {/* Bulk upload ZIP experience */}
                  {selectedZipFile ? (
                    <div className="flex-1 flex flex-col p-6 overflow-y-auto min-h-0">
                      {/* Show review interface when analysis is complete */}
                      {(() => {
                        console.log('showBulkReview:', showBulkReview, 'bulkImportCompleted:', bulkImportCompleted);
                        console.log('bulkExtractedData count:', Object.keys(bulkExtractedData).length);
                        return null;
                      })()}
                      {showBulkReview ? (
                        <div className="w-full">
                          {bulkImportCompleted && (
                            <Alert
                              message="Import Completed Successfully!"
                              description={`${Object.values(bulkExtractedData).filter(d => d.status === 'signed').length} signed contracts and ${Object.values(bulkExtractedData).filter(d => d.status === 'template').length} templates have been imported to your document library.`}
                              type="success"
                              showIcon
                              closable
                              style={{ marginBottom: 16 }}
                              action={
                                <Space>
                                  <Button size="small" type="primary" onClick={() => setSelectedPage('contracts')}>
                                    View Contracts
                                  </Button>
                                  <Button size="small" onClick={() => {
                                    // Reset for new import
                                    setSelectedZipFile(null);
                                    setBulkUploadDocCount(0);
                                    setBulkUploadFolderCount(0);
                                    setBulkUploadProgress(0);
                                    setBulkUploadTotal(0);
                                    setBulkExtractedData({});
                                    setShowBulkReview(false);
                                    setBulkAnalysisProgress(0);
                                    setBulkImportCompleted(false);
                                    setCurrentFolderPath([]);
                                    setSelectedFiles(new Set());
                                    setChatMessages([]);
                                  }}>
                                    New Import
                                  </Button>
                                </Space>
                              }
                            />
                          )}
                          <Tabs 
                            activeKey={bulkReviewTab}
                            onChange={(key) => setBulkReviewTab(key as 'table' | 'folders')}
                            items={[
                              {
                                key: 'table',
                                label: 'Contract Table',
                                children: (
                                  <div className="mt-4">
                                    <div className="mb-4">
                                      <Alert
                                        message="Signed Contracts Analysis"
                                        description={
                                          bulkAnalysisActive 
                                            ? `Analyzing documents... ${bulkAnalysisProgress}/${bulkUploadTotal} processed. Found ${Object.values(bulkExtractedData).filter(d => d.status === 'signed').length} signed contracts so far.`
                                            : `${Object.values(bulkExtractedData).filter(d => d.status === 'signed').length} signed contracts detected out of ${bulkUploadTotal} total documents`
                                        }
                                        type={bulkAnalysisActive ? "warning" : "info"}
                                        showIcon
                                      />
                                    </div>
                                    <Table
                                      loading={bulkAnalysisActive && bulkAnalysisProgress < bulkUploadTotal}
                                      dataSource={Object.entries(bulkExtractedData)
                                        .filter(([_, data]) => data.status === 'signed')
                                        .map(([fileName, data], index) => ({
                                          key: index,
                                          title: fileName,
                                          parties: data.parties.join(', '),
                                          effectiveDate: data.dates.effective || '-',
                                          expirationDate: data.dates.expiry || '-',
                                          renewalDate: data.dates.renewal || '-',
                                          agreementCategory: data.agreementCategory,
                                          documentType: data.docType,
                                          totalValue: data.totalAgreementValue !== 'N/A' ? data.totalAgreementValue : '-',
                                          stage: 'Signed',
                                          status: data.dates.expiry && new Date(data.dates.expiry) < new Date() ? 'Expired' : 'Active'
                                        }))}
                                      columns={[
                                        {
                                          title: 'Title',
                                          dataIndex: 'title',
                                          key: 'title',
                                          width: 250,
                                          ellipsis: true,
                                          render: (text: string) => <span className="font-medium">{text}</span>
                                        },
                                        {
                                          title: 'Parties',
                                          dataIndex: 'parties',
                                          key: 'parties',
                                          width: 250,
                                          ellipsis: true,
                                        },
                                        {
                                          title: 'Effective Date',
                                          dataIndex: 'effectiveDate',
                                          key: 'effectiveDate',
                                          width: 120,
                                        },
                                        {
                                          title: 'Expiration Date',
                                          dataIndex: 'expirationDate',
                                          key: 'expirationDate',
                                          width: 120,
                                        },
                                        {
                                          title: 'Renewal Date',
                                          dataIndex: 'renewalDate',
                                          key: 'renewalDate',
                                          width: 120,
                                        },
                                        {
                                          title: 'Agreement Category',
                                          dataIndex: 'agreementCategory',
                                          key: 'agreementCategory',
                                          width: 180,
                                          filters: [...new Set(Object.values(bulkExtractedData).map(d => d.agreementCategory))].map(cat => ({ text: cat, value: cat })),
                                          onFilter: (value, record) => record.agreementCategory === value,
                                        },
                                        {
                                          title: 'Document Type',
                                          dataIndex: 'documentType',
                                          key: 'documentType',
                                          width: 220,
                                        },
                                        {
                                          title: 'Total Value',
                                          dataIndex: 'totalValue',
                                          key: 'totalValue',
                                          width: 150,
                                          align: 'right',
                                          render: (value: string) => (
                                            <span className={value !== '-' ? 'font-semibold text-green-600' : ''}>{value}</span>
                                          ),
                                        },
                                        {
                                          title: 'Stage',
                                          dataIndex: 'stage',
                                          key: 'stage',
                                          width: 100,
                                          render: (stage: string) => (
                                            <Tag color="green">{stage}</Tag>
                                          ),
                                        },
                                        {
                                          title: 'Status',
                                          dataIndex: 'status',
                                          key: 'status',
                                          width: 100,
                                          render: (status: string) => (
                                            <Tag color={status === 'Active' ? 'blue' : 'red'}>{status}</Tag>
                                          ),
                                        },
                                      ]}
                                      scroll={{ x: 1700, y: 400 }}
                                      pagination={{ pageSize: 20 }}
                                      size="small"
                                      style={{ 
                                        background: darkMode ? '#1a1a1a' : '#fff',
                                        borderRadius: 8,
                                      }}
                                    />
                                    <div className="mt-4 flex justify-between items-center">
                                      <div className="text-sm text-gray-500">
                                        Showing {Object.values(bulkExtractedData).filter(d => d.status === 'signed').length} signed contracts
                                      </div>
                                      <Button 
                                        type="default"
                                        icon={<ExportOutlined />}
                                        onClick={() => message.info('Export functionality would be implemented here')}
                                      >
                                        Export to CSV
                                      </Button>
                                    </div>
                                  </div>
                                )
                              },
                              {
                                key: 'folders',
                                label: 'Folder Navigation',
                                children: (
                                  <div className="mt-4">
                                    {/* Header with breadcrumb navigation */}
                                    <div className="mb-4">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                          {/* Breadcrumb navigation */}
                                          <div className="flex items-center text-sm">
                                            <Button 
                                              type="text" 
                                              size="small"
                                              icon={<FolderOutlined />}
                                              onClick={() => setCurrentFolderPath([])}
                                              className="px-2"
                                            >
                                              My Contracts
                                            </Button>
                                            {currentFolderPath.map((folder, index) => (
                                              <React.Fragment key={index}>
                                                <span className="mx-1 text-gray-400">/</span>
                                                <Button
                                                  type="text"
                                                  size="small"
                                                  onClick={() => setCurrentFolderPath(currentFolderPath.slice(0, index + 1))}
                                                  className="px-2"
                                                >
                                                  {folder}
                                                </Button>
                                              </React.Fragment>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {selectedFiles.size > 0 && (
                                            <span className="text-sm text-gray-500">
                                              {selectedFiles.size} selected
                                            </span>
                                          )}
                                          <Button
                                            type={bulkImportCompleted ? "default" : "primary"}
                                            icon={bulkImportCompleted ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CheckOutlined />}
                                            onClick={() => {
                                              if (!bulkImportCompleted) {
                                                message.success('All documents imported and organized successfully!');
                                                setBulkImportCompleted(true);
                                              }
                                            }}
                                            disabled={bulkImportCompleted}
                                          >
                                            {bulkImportCompleted ? 'Documents Imported' : 'Import All Documents'}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Modern Google Drive-like folder view */}
                                    <div className="border rounded-lg overflow-hidden" style={{ 
                                      background: darkMode ? '#1a1a1a' : '#ffffff',
                                      minHeight: 500
                                    }}>
                                      {/* Toolbar */}
                                      <div className="border-b px-4 py-2" style={{ borderColor: darkMode ? '#333' : '#e0e0e0' }}>
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm text-gray-500">
                                            {(() => {
                                              // Build folder structure first to count items
                                              const folderStructure: Record<string, any> = {};
                                              Object.entries(bulkExtractedData).forEach(([fileName, data]) => {
                                                const folderPath = data.suggestedFolder;
                                                const parts = folderPath.split('/');
                                                
                                                let current = folderStructure;
                                                parts.forEach((part, index) => {
                                                  if (!current[part]) {
                                                    current[part] = { _files: [], _subfolders: {} };
                                                  }
                                                  if (index < parts.length - 1) {
                                                    current = current[part]._subfolders;
                                                  }
                                                });
                                                
                                                const deepestFolder = parts.reduce((acc, part, index) => {
                                                  if (index === 0) return acc[part];
                                                  return acc._subfolders[part];
                                                }, folderStructure);
                                                deepestFolder._files.push({ fileName, data });
                                              });
                                              
                                              // Get current folder
                                              let currentFolder = folderStructure;
                                              for (const folder of currentFolderPath) {
                                                currentFolder = currentFolder[folder]?._subfolders || {};
                                              }
                                              
                                              const folderCount = Object.entries(currentFolder)
                                                .filter(([_, content]: [string, any]) => content._subfolders || content._files).length;
                                              const fileCount = (() => {
                                                if (currentFolderPath.length === 0) {
                                                  return Object.entries(bulkExtractedData)
                                                    .filter(([_, data]) => !data.suggestedFolder.includes('/')).length;
                                                } else {
                                                  let folder = folderStructure;
                                                  for (let i = 0; i < currentFolderPath.length; i++) {
                                                    const pathPart = currentFolderPath[i];
                                                    if (i === currentFolderPath.length - 1) {
                                                      return folder[pathPart]?._files?.length || 0;
                                                    } else {
                                                      folder = folder[pathPart]?._subfolders || {};
                                                    }
                                                  }
                                                  return 0;
                                                }
                                              })();
                                              return `${folderCount} folders, ${fileCount} files`;
                                            })()}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Button 
                                              type="text" 
                                              size="small"
                                              icon={<SettingOutlined />}
                                              className="px-2"
                                            >
                                              View options
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                      {(() => {
                                        // Build folder structure
                                        const folderStructure: Record<string, any> = {};
                                        
                                        Object.entries(bulkExtractedData).forEach(([fileName, data]) => {
                                          const folderPath = data.suggestedFolder;
                                          const parts = folderPath.split('/');
                                          
                                          let current = folderStructure;
                                          parts.forEach((part, index) => {
                                            if (!current[part]) {
                                              current[part] = { _files: [], _subfolders: {} };
                                            }
                                            if (index < parts.length - 1) {
                                              current = current[part]._subfolders;
                                            }
                                          });
                                          
                                          // Add file to the deepest folder
                                          const deepestFolder = parts.reduce((acc, part, index) => {
                                            if (index === 0) return acc[part];
                                            return acc._subfolders[part];
                                          }, folderStructure);
                                          deepestFolder._files.push({ fileName, data });
                                        });
                                        
                                        // Get current folder content
                                        let currentFolder = folderStructure;
                                        for (const folder of currentFolderPath) {
                                          currentFolder = currentFolder[folder]?._subfolders || {};
                                        }
                                        
                                        const folders = Object.entries(currentFolder)
                                          .filter(([_, content]: [string, any]) => content._subfolders || content._files)
                                          .map(([name, content]: [string, any]) => ({
                                            name,
                                            isFolder: true,
                                            fileCount: content._files?.length || 0,
                                            subfolderCount: Object.keys(content._subfolders || {}).length
                                          }));
                                        
                                        const files = (() => {
                                          if (currentFolderPath.length === 0) {
                                            // Show files that are not in any subfolder (root level files)
                                            return Object.entries(bulkExtractedData)
                                              .filter(([_, data]) => !data.suggestedFolder.includes('/'))
                                              .map(([fileName, data]) => ({ fileName, data }));
                                          } else {
                                            // Navigate to the current folder
                                            let folder = folderStructure;
                                            for (let i = 0; i < currentFolderPath.length; i++) {
                                              const pathPart = currentFolderPath[i];
                                              if (i === currentFolderPath.length - 1) {
                                                // Last part - return files from this folder
                                                return folder[pathPart]?._files || [];
                                              } else {
                                                // Navigate deeper
                                                folder = folder[pathPart]?._subfolders || {};
                                              }
                                            }
                                            return [];
                                          }
                                        })();
                                        
                                                                                  return (
                                            <div>
                                              {/* Table headers */}
                                              <div className="px-4 py-2 border-b flex items-center justify-between text-xs font-medium uppercase tracking-wider" 
                                                style={{ 
                                                  borderColor: darkMode ? '#333' : '#e0e0e0',
                                                  color: darkMode ? '#9ca3af' : '#6b7280'
                                                }}>
                                                <div className="flex items-center gap-3">
                                                  <Checkbox 
                                                    checked={files.length > 0 && selectedFiles.size === files.length}
                                                    indeterminate={selectedFiles.size > 0 && selectedFiles.size < files.length}
                                                    onChange={(e) => {
                                                      if (e.target.checked) {
                                                        setSelectedFiles(new Set(files.map((f: any) => f.fileName)));
                                                      } else {
                                                        setSelectedFiles(new Set());
                                                      }
                                                    }}
                                                    style={{ marginLeft: 4 }}
                                                  />
                                                  <div style={{ width: 20 }}></div>
                                                  <div>Name</div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                  <div style={{ width: 80 }}>Status</div>
                                                  <div style={{ width: 100 }}>Value</div>
                                                  <div style={{ width: 100 }}>Date</div>
                                                </div>
                                              </div>
                                              
                                              {/* List view of folders and files */}
                                              <div className="divide-y" style={{ borderColor: darkMode ? '#333' : '#e0e0e0' }}>
                                                {/* Folders */}
                                                {folders.map(({ name, fileCount, subfolderCount }) => (
                                                  <div
                                                    key={name}
                                                    onClick={() => setCurrentFolderPath([...currentFolderPath, name])}
                                                    className="group cursor-pointer px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 flex items-center justify-between"
                                                  >
                                                    <div className="flex items-center gap-3">
                                                      <div style={{ width: 24 }}></div>
                                                      <FolderOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                                                      <div>
                                                        <div className="font-medium text-sm group-hover:text-blue-600">{name}</div>
                                                        <div className="text-xs text-gray-500">
                                                          {fileCount > 0 && `${fileCount} files`}
                                                          {fileCount > 0 && subfolderCount > 0 && ', '}
                                                          {subfolderCount > 0 && `${subfolderCount} folders`}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <RightOutlined className="text-gray-400 text-xs" />
                                                  </div>
                                                ))}
                                                
                                                {/* Files */}
                                                {files.map(({ fileName, data }: any) => (
                                                  <div
                                                    key={fileName}
                                                    className="group cursor-pointer px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                                                    style={{
                                                      background: selectedFiles.has(fileName) ? (darkMode ? 'rgba(24, 144, 255, 0.1)' : 'rgba(24, 144, 255, 0.05)') : 'transparent'
                                                    }}
                                                    onClick={() => {
                                                      const newSelected = new Set(selectedFiles);
                                                      if (newSelected.has(fileName)) {
                                                        newSelected.delete(fileName);
                                                      } else {
                                                        newSelected.add(fileName);
                                                      }
                                                      setSelectedFiles(newSelected);
                                                    }}
                                                  >
                                                    <div className="flex items-center justify-between">
                                                      <div className="flex items-center gap-3">
                                                        <Checkbox 
                                                          checked={selectedFiles.has(fileName)}
                                                          onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <FileTextOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                                                        <div>
                                                          <div className="font-medium text-sm group-hover:text-green-600">{fileName}</div>
                                                          <div className="text-xs text-gray-500">{data.docType} • {data.parties[0]}</div>
                                                        </div>
                                                      </div>
                                                      <div className="flex items-center gap-8 text-xs">
                                                        <div style={{ width: 80 }}>
                                                          <Tag color="green" style={{ fontSize: '11px', margin: 0 }}>{data.status}</Tag>
                                                        </div>
                                                        <div style={{ width: 100 }} className="text-green-600 font-medium">
                                                          {data.totalAgreementValue !== 'N/A' ? data.totalAgreementValue : '-'}
                                                        </div>
                                                        <div style={{ width: 100 }} className="text-gray-500">
                                                          {data.dates.effective || '-'}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                              
                                              {/* Empty state */}
                                              {folders.length === 0 && files.length === 0 && (
                                                <div className="text-center py-16 text-gray-500">
                                                  <FolderOpenOutlined style={{ fontSize: 64, marginBottom: 16, opacity: 0.3 }} />
                                                  <div>This folder is empty</div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                      })()}
                                    </div>
                                    
                                    <Alert
                                      message="AI-Powered Organization"
                                      description={
                                        bulkAnalysisActive
                                          ? `AI is organizing documents... ${bulkAnalysisProgress}/${bulkUploadTotal} analyzed into ${new Set(Object.values(bulkExtractedData).map(d => d.suggestedFolder)).size} folders.`
                                          : `Documents have been automatically categorized into ${new Set(Object.values(bulkExtractedData).map(d => d.suggestedFolder)).size} folders based on their content, type, and status.`
                                      }
                                      type={bulkAnalysisActive ? "info" : "success"}
                                      showIcon
                                      style={{ marginTop: 16 }}
                                    />
                                  </div>
                                )
                              }
                            ]}
                          />
                        </div>
                      ) : showBulkTree ? (
                        <Card
                          size="small"
                          title={<span className="font-semibold text-sm flex items-center"><FolderOpenOutlined className="mr-2" />File/Folder Tree</span>}
                          style={{ background: 'transparent', boxShadow: 'none', borderRadius: 12, width: '100%', color: darkMode ? '#fff' : '#222', border: 'none' }}
                        >
                          <Tree
                            treeData={bulkUploadTreeData}
                            showIcon
                            defaultExpandAll
                            height={400}
                            switcherIcon={({ expanded }) => expanded ? <DownOutlined /> : <RightOutlined />}
                          />
                        </Card>
                      ) : (
                        <Card
                          size="small"
                          title={<span className="font-semibold text-sm flex items-center"><FileTextOutlined className="mr-2" />Upload Log</span>}
                          style={{ background: 'transparent', boxShadow: 'none', borderRadius: 12, width: '100%', color: darkMode ? '#fff' : '#222', border: 'none' }}
                        >
                          <div className="space-y-2 text-xs">
                            {bulkUploadLog.length === 0 ? (
                              <div className="text-gray-400">No upload events yet.</div>
                            ) : (
                              bulkUploadLog.map((log, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <ArrowRightOutlined className="text-xs" />
                                  <span>{log}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <>
                      {!showSummaryView && (
                      <div className="mb-4 px-5 py-3" style={{ borderBottom: darkMode ? '1px solid #333' : '1px solid #e5e7eb' }}>
                          <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                              <div className="font-bold text-lg dark:text-white">
                                {documentTitle || (documentType === 'Draft'
                                  ? 'SALES AGREEMENT - DRAFT VERSION 3.2'
                                  : uploadedFiles[0]?.name === 'scorp_letacotruck_msa (1).txt'
                                    ? 'Le Taco Truc - MSA 2025'
                                    : 'S-Corp Non-Disclosure Agreement 2025')}
                              </div>
                          </div>
                        </div>
                      </div>
                      )}
                      {showSummaryView ? (
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between px-6 pt-4">
                            <h2 className="text-xl font-semibold dark:text-white">Document Summary</h2>
                            <Button
                              type="text"
                              icon={<CloseOutlined />}
                              onClick={() => {
                                setShowSummaryView(false);
                                setShowDocumentView(true);
                              }}
                            />
                          </div>
                          <div className="flex-1 p-6 overflow-y-auto">
                            <div className="space-y-6">
                              <Card title="Title" size="small" bordered={false}>
                                <div className="text-sm font-semibold">
                                  {documentTitle || editableSummary.title}
                                </div>
                              </Card>

                              <Card title="Description" size="small" bordered={false}>
                                <div className="text-sm">
                                  {editableSummary.brief}
                                </div>
                              </Card>

                              <Card title="Lifecycle" size="small" bordered={false}>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center gap-2">
                                    <span>Created:</span>
                                    <span className="text-sm">
                                      {dayjs(editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']).format('MMM D, YYYY')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center gap-2">
                                    <span>Last Modified:</span>
                                    <span className="text-sm">
                                      {dayjs(editableSummary.lastModified, ['MMMM D, YYYY', 'MMM D, YYYY']).format('MMM D, YYYY')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center gap-2">
                                    <span>Effective Date:</span>
                                    <span className="text-sm">
                                      {dayjs(editableSummary.effectiveDate || editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']).format('MMM D, YYYY')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center gap-2">
                                    <span>Renewal Date:</span>
                                    <span className="text-sm">
                                      {dayjs(editableSummary.renewalDate || editableSummary.created, ['MMMM D, YYYY', 'MMM D, YYYY']).add(1, 'year').format('MMM D, YYYY')}
                                    </span>
                                  </div>
                                </div>
                              </Card>

                              <Card title="Agreement Category" size="small" bordered={false}>
                                <div className="text-sm">
                                  {editableSummary.agreementCategory}
                                </div>
                              </Card>

                              <Card title="Document Type" size="small" bordered={false}>
                                <div className="text-sm">
                                  {editableSummary.documentType}
                                </div>
                              </Card>

                              <Card title="Total Agreement Value" size="small" bordered={false}>
                                <div className="space-y-2">
                                  <div className="text-lg font-semibold">
                                    {editableSummary.totalAgreementValue}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {editableSummary.totalAgreementDescription}
                                  </div>
                                </div>
                              </Card>

                              <Card title="Third Parties" size="small" bordered={false}>
                                <div className="space-y-2">
                                  {editableSummary.thirdParties?.map((party, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <Avatar size="small" style={{ backgroundColor: '#FF5669' }}>
                                        {party.charAt(0).toUpperCase()}
                                      </Avatar>
                                      <span className="text-sm">{party}</span>
                                    </div>
                                  )) || (
                                    <div className="text-sm text-gray-400">No third parties identified</div>
                                  )}
                                </div>
                              </Card>

                              {editableSummary.clauses.length > 0 && (
                                <Card title="Clauses" size="small" bordered={false}>
                                  <Collapse ghost className="bg-transparent">
                                    {editableSummary.clauses.map((clause, idx) => (
                                      <Collapse.Panel 
                                        key={idx} 
                                        header={
                                          <span className="font-semibold">
                                            {clause.heading}
                                          </span>
                                        }
                                      >
                                        <div className="text-sm whitespace-pre-wrap">
                                          {clause.text}
                                        </div>
                                      </Collapse.Panel>
                                    ))}
                                  </Collapse>
                                </Card>
                              )}
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
                    </>
                  )}
                </div>
                )}
              </div>
            ) : null}
            {/* Always render file input and upload modal so upload works everywhere */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
              accept=".txt,.md,.csv,.json,.log,.rtf,.html,.xml"
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
              ref={zipFileInputRef}
              style={{ display: 'none' }}
              accept=".zip"
              onChange={handleZipFileChange}
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
            {/* Save Modal */}
            <Modal
              title="Select folder to save"
              open={saveModalOpen}
              onCancel={() => {
                setSaveModalOpen(false);
                if (!selectedFolder) {
                  setSelectedFolder(null);
                }
              }}
              onOk={() => { 
                setSaveModalOpen(false);
                // Don't clear selectedFolder here as we want to display it
              }}
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
            {/* Save Type Modal for Drafts */}
            <Modal
              title="How would you like to save this draft?"
              open={saveTypeModalOpen}
              onCancel={() => setSaveTypeModalOpen(false)}
              footer={null}
              centered
            >
              <div className="flex gap-4 justify-center">
                <Card
                  hoverable
                  className={selectedSaveType === 'concord' ? 'ring-2 ring-[#FF5669]' : ''}
                  style={{ width: 220, cursor: 'pointer', borderRadius: 12 }}
                  onClick={() => {
                    setSelectedSaveType('concord');
                    setSaveTypeModalOpen(false);
                    setTimeout(() => setSaveModalOpen(true), 200);
                  }}
                >
                  <div className="font-semibold text-base mb-2">Live Concord document</div>
                  <div className="text-xs text-gray-500 mb-2">Allow full editing of document content in Concord</div>
                  <div className="text-xs text-gray-400">Best for collaborative workflows</div>
                </Card>
                <Card
                  hoverable
                  className={selectedSaveType === 'word' ? 'ring-2 ring-[#FF5669]' : ''}
                  style={{ width: 220, cursor: 'pointer', borderRadius: 12 }}
                  onClick={() => {
                    setSelectedSaveType('word');
                    setSaveTypeModalOpen(false);
                    setTimeout(() => setSaveModalOpen(true), 200);
                  }}
                >
                  <div className="font-semibold text-base mb-2">Word document</div>
                  <div className="text-xs text-gray-500 mb-2">Conserve Word formatting and comments, but uneditable in Concord</div>
                  <div className="text-xs text-gray-400">Best for legal review and external sharing</div>
                </Card>
              </div>
            </Modal>
            {/* Save in Concord Modal */}
            <Modal
              title="How would you like to open the document in Concord?"
              open={saveConcordModalOpen}
              onCancel={() => setSaveConcordModalOpen(false)}
              footer={null}
              centered
              width={600}
            >
              <div className="flex gap-4 justify-center">
                <Card
                  hoverable
                  className={selectedConcordType === 'live' ? 'ring-2 ring-[#FF5669]' : ''}
                  style={{ 
                    width: 260, 
                    cursor: 'pointer', 
                    borderRadius: 12,
                    padding: '24px'
                  }}
                  onClick={() => {
                    setSelectedConcordType('live');
                    setSaveConcordModalOpen(false);
                    setTimeout(() => setSelectedPage('dashboard'), 200);
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#5865F2]/10 rounded-lg">
                      <FileTextOutlined style={{ fontSize: 20, color: '#5865F2' }} />
                    </div>
                    <div className="font-semibold text-lg">Live document</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-[#5865F2] mt-0.5" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Edit live in Concord</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-[#5865F2] mt-0.5" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Conditional approvals</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-[#5865F2] mt-0.5" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Smart fields & clause library</span>
                    </div>
                  </div>
                </Card>
                <Card
                  hoverable
                  className={selectedConcordType === 'word' ? 'ring-2 ring-[#FF5669]' : ''}
                  style={{ 
                    width: 260, 
                    cursor: 'pointer', 
                    borderRadius: 12,
                    padding: '24px'
                  }}
                  onClick={() => {
                    setSelectedConcordType('word');
                    setSaveConcordModalOpen(false);
                    setTimeout(() => setSelectedPage('dashboard'), 200);
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="font-bold text-lg" style={{ color: '#0F6CBD' }}>W</span>
                    </div>
                    <div className="font-semibold text-lg">Word</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-gray-400" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Edit offline in Word</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-gray-400" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Simple approvals</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckOutlined className="text-gray-400" style={{ fontSize: 12 }} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Maintain original format</span>
                    </div>
                  </div>
                </Card>
              </div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
