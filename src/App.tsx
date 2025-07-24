import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Table, Tag, Avatar, Dropdown, Space, ConfigProvider, theme as antdTheme, Segmented, Select, Modal, Upload, message, Card, Collapse, Tree, Skeleton, DatePicker, Tabs, Alert, Checkbox, Statistic, Switch, Progress, Badge, Divider } from 'antd';
import { PlusOutlined, UserOutlined, BellOutlined, FileTextOutlined, SettingOutlined, LogoutOutlined, BulbOutlined, BulbFilled, ArrowUpOutlined, PaperClipOutlined, CloseOutlined, MessageOutlined, ArrowRightOutlined, FolderOutlined, DownOutlined, RightOutlined, CalendarOutlined, TagsOutlined, FileZipOutlined, FolderOpenOutlined, CheckOutlined, EditOutlined, InfoCircleOutlined, ExportOutlined, FileDoneOutlined, FileExclamationOutlined, DownloadOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import dayjs from 'dayjs';
import JSZip from 'jszip';
import type { DataNode } from 'antd/es/tree';
// Removed unused recharts imports for cleaner code

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

  // Add state for upload summary dashboard
  const [uploadSummary, setUploadSummary] = useState<{
    totalDocuments: number;
    successfulUploads: number;
    failedUploads: number;
    failedDetails: Array<{ fileName: string; reason: string; error: string }>;
  }>({
    totalDocuments: 0,
    successfulUploads: 0,
    failedUploads: 0,
    failedDetails: []
  });
  const [showFailedDetails, setShowFailedDetails] = useState(false);
  
  // Custom properties state
  const [systemProperties] = useState([
    { id: 'department', name: 'Department', type: 'select', options: ['Legal', 'Finance', 'HR', 'Sales', 'Engineering'] },
    { id: 'priority', name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
    { id: 'client_type', name: 'Client Type', type: 'select', options: ['Enterprise', 'SMB', 'Individual'] },
    { id: 'retention_period', name: 'Retention Period', type: 'select', options: ['1 Year', '3 Years', '5 Years', '7 Years', 'Permanent'] },
    { id: 'jurisdiction', name: 'Jurisdiction', type: 'text' },
    { id: 'contract_value', name: 'Contract Value', type: 'number' },
    { id: 'review_date', name: 'Review Date', type: 'date' }
  ]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [propertyValues, setPropertyValues] = useState<Record<string, any>>({});
  
  // AI Organize state
  const [showAIOrganize, setShowAIOrganize] = useState(false);
  const [aiSuggestedStructure, setAISuggestedStructure] = useState<{
    folders: Array<{
      name: string;
      path: string;
      count: number;
      confidence: number;
      logic: string;
      documents: string[];
    }>;
    organizationLogic: string;
  } | null>(null);
  
  // Duplicate detection state
  const [duplicateGroups, setDuplicateGroups] = useState<Array<{
    documents: Array<{
      fileName: string;
      data: {
        docType: string;
        parties: string[];
        dates: Record<string, string>;
        status?: string;
        [key: string]: any;
      };
      isExisting?: boolean;
    }>;
    similarity: number;
    action: 'pending' | 'keep_both' | 'replace' | 'skip';
  }>>([]);
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedDuplicateGroup, setSelectedDuplicateGroup] = useState<number | null>(null);
  
  // Time tracking state for progress estimates
  const [uploadStartTime, setUploadStartTime] = useState<number | null>(null);
  const [analysisStartTime, setAnalysisStartTime] = useState<number | null>(null);
  const [uploadTimeEstimate, setUploadTimeEstimate] = useState<string>('Calculating...');
  const [analysisTimeEstimate, setAnalysisTimeEstimate] = useState<string>('Calculating...');
  const [lastProgressUpdate, setLastProgressUpdate] = useState<number>(0);
  
  // Folder selection state
  const [userSelectedFolders, setUserSelectedFolders] = useState<Record<string, string>>({});
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [selectedDocumentForFolder, setSelectedDocumentForFolder] = useState<string | null>(null);



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
      setUploadStartTime(Date.now());
      setUploadTimeEstimate('Calculating...');
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Bulk upload started for ${bulkUploadDocCount} documents in ${bulkUploadFolderCount} folders. AI will automatically extract document information, classify documents, and suggest organization.` },
        { role: 'system-progress', content: 'Document upload in progress' }
      ]);
      
      // Show summary dashboard immediately
      setShowBulkReview(true);
      
      let progress = 0;
      const log: string[] = [];
      const failedFiles: Array<{ fileName: string; reason: string; error: string }> = [];
      
      function uploadNext() {
        if (progress < bulkUploadTotal) {
          setTimeout(() => {
            progress++;
            
            // Simulate some failures (10% failure rate)
            const isFailure = Math.random() < 0.1;
            if (isFailure) {
              const errorTypes = [
                { reason: 'FILE_TOO_LARGE', error: 'File exceeds 50MB limit' },
                { reason: 'INVALID_FORMAT', error: 'Unsupported file format' },
                { reason: 'CORRUPTED_FILE', error: 'File appears to be corrupted' },
                { reason: 'ACCESS_DENIED', error: 'Insufficient permissions' }
              ];
              const error = errorTypes[Math.floor(Math.random() * errorTypes.length)];
              failedFiles.push({ 
                fileName: `Document_${progress}.pdf`, 
                ...error 
              });
            }
            
            log.push(`Uploaded document ${progress} of ${bulkUploadTotal}`);
            setBulkUploadProgress(progress);
            setBulkUploadLog([...log]);
            
            // Update summary progressively
            setUploadSummary({
              totalDocuments: bulkUploadTotal,
              successfulUploads: progress - failedFiles.length,
              failedUploads: failedFiles.length,
              failedDetails: [...failedFiles]
            });
            
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
          // Start analysis automatically
          analyzeBulkDocuments();
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
    setAnalysisStartTime(Date.now());
    setAnalysisTimeEstimate('Calculating...');
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

        // Create some intentional duplicates for demonstration
        let isTemplate, isSigned, category, docType, company, year;
        
        // Files 3-5 and 8-10 will be duplicates/similar to demonstrate duplicate detection
        if ((analyzed >= 3 && analyzed <= 5) || (analyzed >= 8 && analyzed <= 10)) {
          // Create similar documents to trigger duplicate detection
          if (analyzed === 3 || analyzed === 8) {
            category = 'Service Agreement';
            docType = 'Service Agreement';
            company = 'TechCorp';
            year = '2023';
            isTemplate = false;
            isSigned = true;
          } else if (analyzed === 4 || analyzed === 9) {
            category = 'NDA';
            docType = 'Non-Disclosure Agreement';
            company = 'Global Partners';
            year = '2023';
            isTemplate = false;
            isSigned = true;
          } else {
            category = 'Service Agreement';
            docType = 'Service Agreement';
            company = 'TechCorp';  // Same company as file 3/8
            year = '2024';  // Different year
            isTemplate = false;
            isSigned = true;
          }
        } else {
          // Random generation for other files
          isTemplate = Math.random() > 0.8;
          isSigned = !isTemplate && Math.random() > 0.3;
          category = categories[Math.floor(Math.random() * categories.length)];
          docType = docTypesByCategory[category][Math.floor(Math.random() * docTypesByCategory[category].length)];
          company = companies[Math.floor(Math.random() * companies.length)];
          year = isSigned ? (Math.random() > 0.5 ? '2024' : '2023') : '2024';
        }
          
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
            parties: isSigned ? [company, 'Our Company'] : ['[Party 1]', '[Party 2]'],
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
              [employees[Math.floor(Math.random() * employees.length)] + ' (Our Company)', 
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
  
  // Run duplicate detection whenever bulk extracted data changes
  useEffect(() => {
    const documentCount = Object.keys(bulkExtractedData).length;
    if (documentCount > 0 && !bulkAnalysisActive) {
      console.log('Running duplicate detection for', documentCount, 'documents');
      detectDuplicates();
    }
  }, [bulkExtractedData, bulkAnalysisActive]);
  
  // Helper function to format time estimates
  const formatTimeEstimate = (seconds: number): string => {
    if (seconds < 60) {
      return 'Less than 1 minute';
    } else if (seconds < 120) {
      return '1 minute';
    } else {
      const minutes = Math.ceil(seconds / 60);
      return `${minutes} minutes`;
    }
  };
  
  // Helper function to get historical average time
  const getHistoricalAverage = (docCount: number): string => {
    // Simulated historical data - in real app, this would come from backend
    const avgTimePerDoc = 2.5; // seconds per document
    const totalSeconds = docCount * avgTimePerDoc;
    return formatTimeEstimate(totalSeconds);
  };
  
  // Update time estimates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Update upload time estimate
      if (bulkUploadActive && uploadStartTime && bulkUploadProgress > 0) {
        const elapsedSeconds = (now - uploadStartTime) / 1000;
        const docsPerSecond = bulkUploadProgress / elapsedSeconds;
        const remainingDocs = bulkUploadTotal - bulkUploadProgress;
        const estimatedSecondsRemaining = remainingDocs / docsPerSecond;
        setUploadTimeEstimate(formatTimeEstimate(estimatedSecondsRemaining));
      }
      
      // Update analysis time estimate
      if (bulkAnalysisActive && analysisStartTime && bulkAnalysisProgress > 0) {
        const elapsedSeconds = (now - analysisStartTime) / 1000;
        const docsPerSecond = bulkAnalysisProgress / elapsedSeconds;
        const remainingDocs = bulkUploadTotal - bulkAnalysisProgress;
        const estimatedSecondsRemaining = remainingDocs / docsPerSecond;
        setAnalysisTimeEstimate(formatTimeEstimate(estimatedSecondsRemaining));
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [bulkUploadActive, bulkAnalysisActive, uploadStartTime, analysisStartTime, 
      bulkUploadProgress, bulkAnalysisProgress, bulkUploadTotal]);

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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Estimated time remaining: {uploadTimeEstimate}
                </div>
                {bulkUploadProgress === 0 && (
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Usually takes {getHistoricalAverage(bulkUploadTotal)} for this many documents
                  </div>
                )}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Estimated time remaining: {analysisTimeEstimate}
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

      // Calculate similarity between two documents
    const calculateSimilarity = (doc1: any, doc2: any): number => {
      let score = 0;
      let factors = 0;
      
      // Compare titles/types (40% weight)
      if (doc1.docType && doc2.docType) {
        const titleSimilarity = doc1.docType.toLowerCase() === doc2.docType.toLowerCase() ? 1 : 
          (doc1.docType.toLowerCase().includes(doc2.docType.toLowerCase()) || 
           doc2.docType.toLowerCase().includes(doc1.docType.toLowerCase())) ? 0.7 : 0;
        score += titleSimilarity * 0.4;
        factors += 0.4;
      }
      
      // Compare parties (40% weight)
      if (doc1.parties && doc2.parties && doc1.parties.length > 0 && doc2.parties.length > 0) {
        const commonParties = doc1.parties.filter((p1: string) => 
          doc2.parties.some((p2: string) => p1.toLowerCase() === p2.toLowerCase())
        );
        const partySimilarity = commonParties.length / Math.max(doc1.parties.length, doc2.parties.length);
        score += partySimilarity * 0.4;
        factors += 0.4;
      }
      
      // Compare dates (20% weight)
      if (doc1.dates && doc2.dates) {
        let dateSimilarity = 0;
        if (doc1.dates.effective === doc2.dates.effective) dateSimilarity += 0.5;
        if (doc1.dates.expiry === doc2.dates.expiry) dateSimilarity += 0.5;
        score += dateSimilarity * 0.2;
        factors += 0.2;
      }
      
      return factors > 0 ? score / factors : 0;
    };
    
    // Detect duplicates in bulk uploaded documents
    const detectDuplicates = () => {
      const documents = Object.entries(bulkExtractedData);
      console.log('Detecting duplicates for', documents.length, 'documents');
      const duplicates: typeof duplicateGroups = [];
      const processed = new Set<string>();
      
      // Also check against existing documents (simulated)
      const existingDocs = [
        {
          fileName: "Service Agreement - TechCorp 2023.pdf",
          data: {
            docType: "Service Agreement",
            parties: ["TechCorp", "Our Company"],
            dates: { effective: "2023-01-15", expiry: "2024-01-15" },
            status: "signed",
            confidence: 0.95,
            suggestedFolder: "Contracts/Service Agreements",
            extractedClauses: ["Payment Terms", "Service Scope", "Termination"],
            keyTerms: ["monthly payment", "support services", "12 months"],
            risks: ["Auto-renewal clause"],
            obligations: ["Monthly service delivery", "24/7 support"],
            fileName: "Service Agreement - TechCorp 2023.pdf",
            uploadDate: "2023-01-10",
            originalPath: "Documents/Contracts",
            agreementCategory: "Service Agreement",
            totalAgreementValue: "$50,000",
            totalAgreementDescription: "Monthly service fees for 12 months",
            signers: ["John Doe", "Jane Smith"]
          }
        },
        {
          fileName: "NDA - Global Partners.pdf",
          data: {
            docType: "Non-Disclosure Agreement",
            parties: ["Global Partners", "Our Company"],
            dates: { effective: "2023-06-01" },
            status: "signed",
            confidence: 0.92,
            suggestedFolder: "Legal/NDAs",
            extractedClauses: ["Confidentiality", "Non-Disclosure", "Term"],
            keyTerms: ["confidential information", "5 years", "mutual"],
            risks: [],
            obligations: ["Maintain confidentiality", "Protect information"],
            fileName: "NDA - Global Partners.pdf",
            uploadDate: "2023-05-28",
            originalPath: "Documents/Legal",
            agreementCategory: "Non-Disclosure Agreement",
            totalAgreementValue: "N/A",
            totalAgreementDescription: "Mutual non-disclosure agreement",
            signers: ["Alice Johnson", "Bob Williams"]
          }
        }
      ];
      
      documents.forEach(([fileName1, doc1], index1) => {
        if (processed.has(fileName1)) return;
        
        const group = {
          documents: [{ fileName: fileName1, data: doc1 }],
          similarity: 0,
          action: 'pending' as const
        };
        
        // Check against other uploaded documents
        documents.forEach(([fileName2, doc2], index2) => {
          if (index2 <= index1 || processed.has(fileName2)) return;
          
          const similarity = calculateSimilarity(doc1, doc2);
          if (similarity >= 0.7) {
            console.log(`Found duplicate: ${fileName1} and ${fileName2} with ${Math.round(similarity * 100)}% similarity`);
            group.documents.push({ fileName: fileName2, data: doc2 });
            group.similarity = Math.max(group.similarity, similarity);
            processed.add(fileName2);
          }
        });
        
        // Check against existing documents
        existingDocs.forEach(existing => {
          const similarity = calculateSimilarity(doc1, existing.data);
          console.log(`Checking ${fileName1} against existing ${existing.fileName}: ${Math.round(similarity * 100)}% similarity`);
          if (similarity >= 0.7) {
            console.log(`Found duplicate with existing: ${fileName1} and ${existing.fileName}`);
            group.documents.push({ 
              fileName: existing.fileName, 
              data: existing.data, 
              isExisting: true 
            });
            group.similarity = Math.max(group.similarity, similarity);
          }
        });
        
        if (group.documents.length > 1) {
          duplicates.push(group);
          processed.add(fileName1);
        }
      });
      
      console.log(`Found ${duplicates.length} duplicate groups`);
      setDuplicateGroups(duplicates);
    };

    const generateAISuggestedStructure = () => {
      // Analyze documents and create suggested folder structure
      const documents = Object.entries(bulkExtractedData);
      const suggestedFolders: Array<{
        name: string;
        path: string;
        count: number;
        confidence: number;
        logic: string;
        documents: string[];
      }> = [];

      // Group by status first (Active vs Archived)
      const activeContracts = documents.filter(([_, doc]) => 
        doc.status === 'signed' && (!doc.dates.expiry || new Date(doc.dates.expiry) >= new Date())
      );
      const archivedContracts = documents.filter(([_, doc]) => 
        doc.status === 'signed' && doc.dates.expiry && new Date(doc.dates.expiry) < new Date()
      );
      const templates = documents.filter(([_, doc]) => doc.status === 'template');

      // Organize active contracts by department/type
      const departmentGroups: Record<string, string[]> = {};
      activeContracts.forEach(([fileName, doc]) => {
        const dept = doc.agreementCategory || 'General';
        if (!departmentGroups[dept]) departmentGroups[dept] = [];
        departmentGroups[dept].push(fileName);
      });

      // Create folder structure for active contracts
      Object.entries(departmentGroups).forEach(([dept, files]) => {
        suggestedFolders.push({
          name: dept,
          path: `Active Contracts/${dept}`,
          count: files.length,
          confidence: 0.85 + Math.random() * 0.15, // 85-100% confidence
          logic: `Grouped by agreement category: ${dept}`,
          documents: files
        });
      });

      // Add archived contracts folder
      if (archivedContracts.length > 0) {
        suggestedFolders.push({
          name: 'Archived Contracts',
          path: 'Archived Contracts',
          count: archivedContracts.length,
          confidence: 0.95,
          logic: 'Expired contracts automatically archived',
          documents: archivedContracts.map(([fileName]) => fileName)
        });
      }

      // Add templates folder
      if (templates.length > 0) {
        suggestedFolders.push({
          name: 'Contract Templates',
          path: 'Templates',
          count: templates.length,
          confidence: 0.90,
          logic: 'Unsigned templates grouped separately',
          documents: templates.map(([fileName]) => fileName)
        });
      }

      setAISuggestedStructure({
        folders: suggestedFolders,
        organizationLogic: 'Documents organized by: 1) Status (Active/Archived), 2) Department/Category, 3) Document Type'
      });
    };

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
      
      // Clear upload summary
      setUploadSummary({
        totalDocuments: 0,
        successfulUploads: 0,
        failedUploads: 0,
        failedDetails: []
      });
      
              // Clear custom properties
        setSelectedProperties([]);
        setPropertyValues({});
        
                // Clear AI organize state
        setShowAIOrganize(false);
        setAISuggestedStructure(null);
        
        // Clear duplicate detection state
        setDuplicateGroups([]);
        setShowDuplicatesOnly(false);
        setShowDuplicateModal(false);
        setSelectedDuplicateGroup(null);
        
        // Clear time tracking state
        setUploadStartTime(null);
        setAnalysisStartTime(null);
        setUploadTimeEstimate('Calculating...');
        setAnalysisTimeEstimate('Calculating...');
        setLastProgressUpdate(0);
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
                        <div className="w-full space-y-4">
                                                    {/* Action Header */}
                          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-center">
                              <div>
                                <h2 className="text-lg font-semibold text-gray-100">Upload Summary</h2>
                                <p className="text-sm text-gray-400 mt-1">
                                  Review the analysis results and manage your imported documents
                                </p>
                              </div>
                                <Space>
                                            <Button 
                                  type="primary" 
                                  onClick={() => {
                                    setBulkImportCompleted(true);
                                    setChatMessages(prev => [...prev, 
                                      { role: 'assistant', content: 'All documents have been imported successfully!' }
                                    ]);
                                    message.success('All documents imported successfully');
                                  }} 
                                  disabled={bulkImportCompleted || bulkAnalysisActive}
                                >
                                  {bulkImportCompleted ? 'Import Complete' : 'Import All Documents'}
                                            </Button>
                                                <Button
                                            onClick={() => {
                                    setShowBulkReview(false);
                                    setShowBulkTree(false);
                                    setBulkAnalysisActive(false);
                                    setBulkUploadProgress(0);
                                    setBulkUploadTotal(0);
                                    setBulkExtractedData({});
                                    setSelectedZipFile(null);
                                    setBulkUploadDocCount(0);
                                    setBulkUploadFolderCount(0);
                                    setBulkImportCompleted(false);
                                    setUploadSummary({
                                      totalDocuments: 0,
                                      successfulUploads: 0,
                                      failedUploads: 0,
                                      failedDetails: []
                                    });
                                                                    setSelectedProperties([]);
                                                                setPropertyValues({});
                                setShowAIOrganize(false);
                                setAISuggestedStructure(null);
                                setDuplicateGroups([]);
                                setShowDuplicatesOnly(false);
                                setShowDuplicateModal(false);
                                setSelectedDuplicateGroup(null);
                                setUploadStartTime(null);
                                setAnalysisStartTime(null);
                                setUploadTimeEstimate('Calculating...');
                                setAnalysisTimeEstimate('Calculating...');
                                setLastProgressUpdate(0);
                                    setChatMessages([]);
                                  }}
                                >
                                    New Import
                                  </Button>
                                </Space>
                                        </div>
                                      </div>

                                                    {/* Summary Stats - Minimalist */}
                          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                            <div className="grid grid-cols-4 gap-8">
                              <div className="text-center">
                                <div className="text-3xl font-light text-gray-100">{uploadSummary.totalDocuments}</div>
                                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Total</div>
                              </div>
                              <div className="text-center relative">
                                <div className="absolute top-0 right-4">
                                  <DownloadOutlined 
                                    className="text-gray-600 hover:text-gray-400 cursor-pointer text-xs"
                                    onClick={() => {
                                      const successfulDocs = Object.entries(bulkExtractedData)
                                        .filter(([_, data]) => data)
                                        .map(([fileName, data]) => ({
                                          fileName,
                                          docType: data.docType,
                                          parties: data.parties.join('; '),
                                          status: data.status,
                                          folder: data.suggestedFolder
                                        }));
                                      console.log('Download successful uploads CSV:', successfulDocs);
                                      message.success('Successful uploads CSV ready (check console)');
                                    }}
                                  />
                                </div>
                                <div className="text-3xl font-light text-green-400">{uploadSummary.successfulUploads}</div>
                                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Uploaded</div>
                              </div>
                              <div className="text-center relative">
                                <div className="absolute top-0 right-4">
                                  <DownloadOutlined 
                                    className="text-gray-600 hover:text-gray-400 cursor-pointer text-xs"
                                          onClick={() => {
                                      console.log('Download failed uploads CSV:', uploadSummary.failedDetails);
                                      message.success('Failed uploads CSV ready (check console)');
                                    }}
                                  />
                                      </div>
                                <div className="text-3xl font-light" style={{ color: uploadSummary.failedUploads > 0 ? '#ff6b6b' : '#6b7280' }}>
                                  {uploadSummary.failedUploads}
                                    </div>
                                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Failed</div>
                              </div>
                              <div className="text-center relative">
                                <div className="absolute top-0 right-4">
                                  <DownloadOutlined 
                                    className="text-gray-600 hover:text-gray-400 cursor-pointer text-xs"
                                    onClick={() => {
                                      const duplicatesCsv = duplicateGroups.flatMap(group => 
                                        group.documents.map(doc => ({
                                          fileName: doc.fileName,
                                          docType: doc.data.docType,
                                          parties: doc.data.parties.join('; '),
                                          similarity: `${Math.round(group.similarity * 100)}%`,
                                          groupId: duplicateGroups.indexOf(group) + 1
                                        }))
                                      );
                                      console.log('Download duplicates CSV:', duplicatesCsv);
                                      message.success('Duplicates CSV ready (check console)');
                                    }}
                                  />
                                      </div>
                                <div className="text-3xl font-light" style={{ color: duplicateGroups.length > 0 ? '#ffa94d' : '#6b7280' }}>
                                  {duplicateGroups.reduce((sum, group) => sum + group.documents.filter(d => !d.isExisting).length, 0)}
                                    </div>
                                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                                  Duplicates{duplicateGroups.length > 0 && ` (${duplicateGroups.length})`}
                                  </div>
                              </div>
                            </div>
                          </div>

                          {/* Duplicates Review Section - Hidden for now */}

                          {/* Failed Uploads - Minimalist */}
                          {uploadSummary.failedUploads > 0 && (
                            <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-4">
                              <div 
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setShowFailedDetails(!showFailedDetails)}
                                      >
                                        <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                  <span className="text-sm text-gray-300">Failed Uploads</span>
                                  <span className="text-xs text-red-400">({uploadSummary.failedUploads})</span>
                                    </div>
                                <DownOutlined 
                                  className="text-gray-500 text-xs transition-transform duration-200"
                                  style={{ transform: showFailedDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                                  </div>
                              
                              {showFailedDetails && (
                                <div className="mt-4 space-y-3">
                                  {(() => {
                                    const groupedErrors = uploadSummary.failedDetails.reduce((acc, item) => {
                                      if (!acc[item.reason]) acc[item.reason] = [];
                                      acc[item.reason].push(item);
                                      return acc;
                                    }, {} as Record<string, typeof uploadSummary.failedDetails>);
                                    
                                    return Object.entries(groupedErrors).map(([reason, items]) => (
                                      <div key={reason} className="pl-4">
                                        <div className="text-xs text-red-400 font-medium">{reason}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{items[0].error}</div>
                                        <div className="text-xs text-gray-600 mt-1">
                                          {items.length} file{items.length > 1 ? 's' : ''} affected
                                        </div>
                                      </div>
                                    ));
                                  })()}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Document Distribution & Folder Organization - Minimalist - TEMPORARILY HIDDEN */}
                          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hidden">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-medium text-gray-300">Document Distribution & Folder Organization</h3>
                                        <div className="flex items-center gap-2">
                                <Switch
                                  checked={showAIOrganize}
                                  onChange={(checked) => {
                                    setShowAIOrganize(checked);
                                  }}
                                  checkedChildren="AI"
                                  unCheckedChildren="Manual"
                                              size="small"
                                />
                              </div>
                            </div>
                            
                            {showAIOrganize ? (
                              // AI Organization View - Hierarchical Structure
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-xs text-blue-400">Concord AI Suggested Hierarchy</div>
                                                <Button
                                    type="primary"
                                                  size="small"
                                    onClick={() => {
                                      // Apply AI suggestions to all documents that don't have user selections
                                      const newSelections = { ...userSelectedFolders };
                                      Object.entries(bulkExtractedData).forEach(([fileName, data]) => {
                                        if (!newSelections[fileName]) {
                                          newSelections[fileName] = data.suggestedFolder || 'Uncategorized';
                                        }
                                      });
                                      setUserSelectedFolders(newSelections);
                                      message.success('AI folder suggestions applied to all documents');
                                    }}
                                  >
                                    Accept Hierarchy
                                                </Button>
                                          </div>
                                
                                {(() => {
                                  // Build hierarchical structure from AI suggestions
                                  const hierarchy: Record<string, { count: number; children: Record<string, { count: number; documents: string[] }> }> = {};
                                  
                                  Object.entries(bulkExtractedData).forEach(([fileName, data]) => {
                                    const folderPath = data.suggestedFolder || 'Uncategorized';
                                    const parts = folderPath.split('/');
                                    const mainFolder = parts[0];
                                    const subFolder = parts.length > 1 ? parts.slice(1).join('/') : '';
                                    
                                    if (!hierarchy[mainFolder]) {
                                      hierarchy[mainFolder] = { count: 0, children: {} };
                                    }
                                    hierarchy[mainFolder].count++;
                                    
                                    if (subFolder) {
                                      if (!hierarchy[mainFolder].children[subFolder]) {
                                        hierarchy[mainFolder].children[subFolder] = { count: 0, documents: [] };
                                      }
                                      hierarchy[mainFolder].children[subFolder].count++;
                                      hierarchy[mainFolder].children[subFolder].documents.push(fileName);
                                    }
                                  });
                                  
                                  return Object.keys(hierarchy).length > 0 ? (
                                    <div className="space-y-3">
                                      {Object.entries(hierarchy)
                                        .sort((a, b) => b[1].count - a[1].count)
                                        .map(([mainFolder, data], index) => (
                                          <div key={index} className="border border-gray-700/50 rounded-lg p-3 bg-gray-700/20">
                                            <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                                <FolderOutlined className="text-blue-500" />
                                                <span className="text-sm font-medium text-gray-200">{mainFolder}</span>
                                              </div>
                                              <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                                                {data.count} documents
                                            </span>
                                            </div>
                                            
                                            {Object.keys(data.children).length > 0 && (
                                              <div className="ml-6 space-y-1 border-l border-gray-700/50 pl-3">
                                                {Object.entries(data.children).map(([subFolder, subData], subIndex) => (
                                                  <div key={subIndex} className="flex items-center justify-between py-1">
                                                    <div className="flex items-center gap-2">
                                                      <FolderOutlined className="text-gray-500 text-xs" />
                                                      <span className="text-xs text-gray-300">{subFolder}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{subData.count}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                      No hierarchy suggestions available
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : (
                              // Manual ZIP Folder Structure View
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-xs text-gray-400">ZIP File Structure</div>
                                          <Button
                                    type="default"
                                    size="small"
                                            onClick={() => {
                                      // Show repository folder selection modal
                                      setShowFolderModal(true);
                                    }}
                                          >
                                    Select Folder
                                          </Button>
                                    </div>
                                    
                                            {(() => {
                                  // Build ZIP folder structure from uploaded documents
                                  const zipStructure: Record<string, string[]> = {};
                                  
                                              Object.entries(bulkExtractedData).forEach(([fileName, data]) => {
                                    // Extract original folder path from fileName or originalPath
                                    const originalPath = data.originalPath || fileName;
                                    const parts = originalPath.split('/');
                                    
                                    if (parts.length > 1) {
                                      // Has folder structure
                                      const folderPath = parts.slice(0, -1).join('/');
                                      const file = parts[parts.length - 1];
                                      
                                      if (!zipStructure[folderPath]) {
                                        zipStructure[folderPath] = [];
                                      }
                                      zipStructure[folderPath].push(file);
                                    } else {
                                      // Root level file
                                      if (!zipStructure['Root']) {
                                        zipStructure['Root'] = [];
                                      }
                                      zipStructure['Root'].push(fileName);
                                                  }
                                                });
                                                
                                  return (
                                    <div className="space-y-3">
                                      <div className="text-xs text-gray-500 mb-2">Original ZIP structure:</div>
                                      <div className="bg-gray-700/20 rounded-lg p-3 max-h-48 overflow-y-auto">
                                        {Object.entries(zipStructure)
                                          .sort((a, b) => a[0].localeCompare(b[0]))
                                          .map(([folderPath, files], index) => {
                                            const parts = folderPath.split('/');
                                            const indent = folderPath === 'Root' ? 0 : (parts.length - 1) * 16;
                                            const displayName = folderPath === 'Root' ? '📁 Root' : parts[parts.length - 1];
                                            
                                            return (
                                              <div key={index} className="mb-2">
                                                <div className="flex items-center gap-2 py-1" style={{ marginLeft: `${indent}px` }}>
                                                  <FolderOutlined className="text-blue-500 text-sm" />
                                                  <span className="text-sm font-medium text-gray-200">{displayName}</span>
                                                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded">
                                                    {files.length} files
                                                  </span>
                                                </div>
                                                
                                                {/* Show files in folder */}
                                                <div className="ml-6 space-y-0.5" style={{ marginLeft: `${indent + 24}px` }}>
                                                  {files.slice(0, 3).map((file, fileIndex) => (
                                                    <div key={fileIndex} className="flex items-center gap-2 py-0.5">
                                                      <FileTextOutlined className="text-gray-500 text-xs" />
                                                      <span className="text-xs text-gray-400 truncate max-w-[250px]" title={file}>
                                                        {file}
                                                      </span>
                                                    </div>
                                                  ))}
                                                  {files.length > 3 && (
                                                    <div className="text-xs text-gray-500 ml-4">
                                                      +{files.length - 3} more files...
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                      
                                      <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="text-xs text-gray-400">Destination Selection</div>
                                          <span className="text-xs text-gray-500">
                                            {Object.keys(userSelectedFolders).length > 0 
                                              ? `${Object.keys(userSelectedFolders).length} documents configured`
                                              : 'No destination selected'
                                            }
                                          </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between p-2 bg-gray-600/30 rounded">
                                          <div className="flex items-center gap-2">
                                            <FolderOutlined className="text-yellow-500" />
                                            <span className="text-sm text-gray-300">
                                              {Object.keys(userSelectedFolders).length > 0 
                                                ? `Selected: ${Object.values(userSelectedFolders)[0] || 'Multiple folders'}`
                                                : 'Choose destination folder'
                                              }
                                            </span>
                                          </div>
                                          <Button
                                            size="small"
                                            type="primary"
                                            onClick={() => {
                                              setShowFolderModal(true);
                                            }}
                                          >
                                            Select Folder
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                            })()}
                                          </div>
                            )}
                          </div>

                          {/* Document Status, Stage, Types & Agreement Category Row - Minimalist */}
                          <div className="grid grid-cols-4 gap-4">
                            {/* Document Status */}
                            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-300">Document Status</h3>
                                <Button
                                  type="text"
                                  size="small"
                                  className="text-xs text-gray-500 hover:text-gray-300 p-0"
                                  onClick={() => message.info('View all statuses')}
                                >
                                  View more
                                </Button>
                              </div>
                              {(() => {
                                const signedDocs = Object.values(bulkExtractedData).filter(doc => doc.status === 'signed');
                                const activeDocs = signedDocs.filter(doc => !doc.dates.expiry || new Date(doc.dates.expiry) >= new Date());
                                const expiredDocs = signedDocs.filter(doc => doc.dates.expiry && new Date(doc.dates.expiry) < new Date());
                                
                                return (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-sm text-gray-400">Active</span>
                                        </div>
                                      <span className="text-sm font-medium text-gray-200">{activeDocs.length}</span>
                                    </div>
                                        <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full" />
                                        <span className="text-sm text-gray-400">Expired</span>
                                      </div>
                                      <span className="text-sm font-medium text-gray-200">{expiredDocs.length}</span>
                                    </div>
                                  </div>
                                );
                                            })()}
                                          </div>
                            
                                                        {/* Document Stage */}
                            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-300">Document Stage</h3>
                                            <Button 
                                              type="text" 
                                              size="small"
                                  className="text-xs text-gray-500 hover:text-gray-300 p-0"
                                  onClick={() => message.info('View all stages')}
                                            >
                                  View more
                                            </Button>
                                          </div>
                              {(() => {
                                const templateCount = Object.values(bulkExtractedData).filter(doc => doc.status === 'template').length;
                                const signedCount = Object.values(bulkExtractedData).filter(doc => doc.status === 'signed').length;
                                        
                                return (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-400">Templates</span>
                                      <span className="text-sm font-medium text-gray-200">{templateCount}</span>
                                        </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-400">Signed</span>
                                      <span className="text-sm font-medium text-gray-200">{signedCount}</span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Document Types */}
                            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-300">Document Types</h3>
                                <Button
                                  type="text"
                                  size="small"
                                  className="text-xs text-gray-500 hover:text-gray-300 p-0"
                                  onClick={() => message.info('View all types')}
                                >
                                  View more
                                </Button>
                                      </div>
                                      {(() => {
                                const typeCounts = Object.values(bulkExtractedData).reduce((acc, doc) => {
                                  acc[doc.docType] = (acc[doc.docType] || 0) + 1;
                                  return acc;
                                }, {} as Record<string, number>);
                                
                                const topTypes = Object.entries(typeCounts)
                                  .sort((a, b) => b[1] - a[1])
                                  .slice(0, 4);
                                
                                return (
                                  <div className="space-y-2">
                                    {topTypes.map(([type, count]) => (
                                      <div key={type} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400 truncate pr-2">{type}</span>
                                        <span className="text-sm font-medium text-gray-200">{count}</span>
                                      </div>
                                    ))}
                                    {Object.keys(typeCounts).length > 4 && (
                                      <div className="text-xs text-gray-500 pt-1">
                                        +{Object.keys(typeCounts).length - 4} more types
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Agreement Category */}
                            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-300">Agreement Category</h3>
                                <Button
                                  type="text"
                                  size="small"
                                  className="text-xs text-gray-500 hover:text-gray-300 p-0"
                                  onClick={() => message.info('View all categories')}
                                >
                                  View more
                                </Button>
                              </div>
                              {(() => {
                                // Extract agreement categories from document data
                                const categoryCounts = Object.values(bulkExtractedData).reduce((acc, doc) => {
                                  // Extract category from document type or create categories based on common patterns
                                  let category = 'General';
                                  
                                  if (doc.docType.toLowerCase().includes('employment') || doc.docType.toLowerCase().includes('hr')) {
                                    category = 'Employment';
                                  } else if (doc.docType.toLowerCase().includes('nda') || doc.docType.toLowerCase().includes('confidentiality')) {
                                    category = 'Confidentiality';
                                  } else if (doc.docType.toLowerCase().includes('service') || doc.docType.toLowerCase().includes('vendor')) {
                                    category = 'Service';
                                  } else if (doc.docType.toLowerCase().includes('license') || doc.docType.toLowerCase().includes('intellectual')) {
                                    category = 'Licensing';
                                  } else if (doc.docType.toLowerCase().includes('sale') || doc.docType.toLowerCase().includes('purchase')) {
                                    category = 'Commercial';
                                  } else if (doc.docType.toLowerCase().includes('partnership') || doc.docType.toLowerCase().includes('joint')) {
                                    category = 'Partnership';
                                  }
                                  
                                  acc[category] = (acc[category] || 0) + 1;
                                  return acc;
                                }, {} as Record<string, number>);
                                
                                const topCategories = Object.entries(categoryCounts)
                                  .sort((a, b) => b[1] - a[1])
                                  .slice(0, 4);
                                        
                                                                                  return (
                                  <div className="space-y-2">
                                    {topCategories.map(([category, count]) => (
                                      <div key={category} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400 truncate pr-2">{category}</span>
                                        <span className="text-sm font-medium text-gray-200">{count}</span>
                                                </div>
                                    ))}
                                    {Object.keys(categoryCounts).length > 4 && (
                                      <div className="text-xs text-gray-500 pt-1">
                                        +{Object.keys(categoryCounts).length - 4} more categories
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                                                </div>
                                              </div>
                                              
                          {/* Third Parties - Minimalist */}
                          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-medium text-gray-300">Third Parties</h3>
                                                    <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500">
                                  {(() => {
                                    const uniqueParties = new Set(Object.values(bulkExtractedData).flatMap(d => d.parties));
                                    return uniqueParties.size;
                                  })()} unique
                                </span>
                                <Button 
                                  type="text" 
                                  size="small"
                                  className="text-xs text-gray-500 hover:text-gray-300 p-0"
                                  onClick={() => message.info('View all parties')}
                                >
                                  View more
                                </Button>
                                                        </div>
                                                      </div>
                            <div className="space-y-2">
                              {(() => {
                                const partyCounts = Object.values(bulkExtractedData).reduce((acc, doc) => {
                                  doc.parties.forEach(party => {
                                    if (!acc[party]) acc[party] = [];
                                    acc[party].push(doc.docType);
                                  });
                                  return acc;
                                }, {} as Record<string, string[]>);
                                
                                const topParties = Object.entries(partyCounts)
                                  .sort((a, b) => b[1].length - a[1].length)
                                  .slice(0, 5);
                                
                                return topParties.map(([party, docTypes]) => (
                                  <div key={party} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400 truncate pr-2">{party}</span>
                                    <span className="text-sm font-medium text-gray-200">{docTypes.length}</span>
                                                    </div>
                                ));
                              })()}
                              {(() => {
                                const uniqueParties = new Set(Object.values(bulkExtractedData).flatMap(d => d.parties));
                                return uniqueParties.size > 5 ? (
                                  <div className="text-xs text-gray-500 pt-1">
                                    +{uniqueParties.size - 5} more parties
                                                  </div>
                                ) : null;
                              })()}
                            </div>
                          </div>

                          {/* Repository Folder Selection Modal */}
                          <Modal
                            title="Select Repository Folder"
                            open={showFolderModal}
                            onCancel={() => {
                              setShowFolderModal(false);
                              setSelectedDocumentForFolder(null);
                            }}
                            footer={null}
                            width={700}
                            className="folder-modal"
                          >
                            <div className="space-y-4">
                              {selectedDocumentForFolder ? (
                                // Single document folder selection from repository
                                <div>
                                  <div className="text-sm text-gray-300 mb-4">
                                    Select repository folder for: <span className="font-medium">{selectedDocumentForFolder}</span>
                                  </div>
                                  
                                  {(() => {
                                    // Repository folder structure with hierarchy
                                    const repositoryStructure = {
                                      'Documents': {
                                        'Contracts': ['Active', 'Templates', 'Archived'],
                                        'Legal': ['NDAs', 'Compliance', 'Policies'],
                                        'Finance': ['Invoices', 'Reports', 'Budgets'],
                                        'HR': ['Policies', 'Employment', 'Training']
                                      },
                                      'Projects': {
                                        'ProjectA': ['Contracts', 'Documents', 'Reports'],
                                        'ProjectB': ['Legal', 'Finance', 'Deliverables']
                                      },
                                      'Archive': {
                                        '2023': ['Contracts', 'Legal', 'Finance'],
                                        '2024': ['Contracts', 'Legal', 'Finance']
                                      }
                                    };
                                    
                                    return (
                                      <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {Object.entries(repositoryStructure).map(([mainFolder, subFolders]) => (
                                          <div key={mainFolder} className="border border-gray-700 rounded-lg">
                                            {/* Main folder */}
                                            <div 
                                              className="flex items-center justify-between p-3 hover:bg-gray-700/30 cursor-pointer border-b border-gray-700/50"
                                              onClick={() => {
                                                setUserSelectedFolders(prev => ({
                                                  ...prev,
                                                  [selectedDocumentForFolder]: mainFolder
                                                }));
                                                message.success(`Folder set to ${mainFolder}`);
                                                setShowFolderModal(false);
                                                setSelectedDocumentForFolder(null);
                                              }}
                                            >
                                                      <div className="flex items-center gap-3">
                                                <FolderOutlined className="text-blue-500" />
                                                <span className="text-gray-200 font-medium">{mainFolder}</span>
                                                        </div>
                                              {userSelectedFolders[selectedDocumentForFolder] === mainFolder && (
                                                <CheckOutlined className="text-green-500" />
                                              )}
                                                      </div>
                                            
                                            {/* Sub folders */}
                                            <div className="p-2">
                                              {Object.entries(subFolders).map(([subFolder, subSubFolders]) => (
                                                <div key={subFolder} className="ml-4">
                                                  <div 
                                                    className="flex items-center justify-between p-2 hover:bg-gray-700/20 cursor-pointer rounded"
                                                    onClick={() => {
                                                      const fullPath = `${mainFolder}/${subFolder}`;
                                                      setUserSelectedFolders(prev => ({
                                                        ...prev,
                                                        [selectedDocumentForFolder]: fullPath
                                                      }));
                                                      message.success(`Folder set to ${fullPath}`);
                                                      setShowFolderModal(false);
                                                      setSelectedDocumentForFolder(null);
                                                    }}
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <FolderOutlined className="text-gray-500 text-sm" />
                                                      <span className="text-gray-300 text-sm">{subFolder}</span>
                                                        </div>
                                                    {userSelectedFolders[selectedDocumentForFolder] === `${mainFolder}/${subFolder}` && (
                                                      <CheckOutlined className="text-green-500" />
                                                    )}
                                                        </div>
                                                  
                                                  {/* Sub-sub folders */}
                                                  <div className="ml-6 space-y-1">
                                                    {(subSubFolders as string[]).map(subSubFolder => {
                                                      const fullPath = `${mainFolder}/${subFolder}/${subSubFolder}`;
                                                      return (
                                                        <div 
                                                          key={subSubFolder}
                                                          className="flex items-center justify-between p-1 hover:bg-gray-700/20 cursor-pointer rounded text-xs"
                                                          onClick={() => {
                                                            setUserSelectedFolders(prev => ({
                                                              ...prev,
                                                              [selectedDocumentForFolder]: fullPath
                                                            }));
                                                            message.success(`Folder set to ${fullPath}`);
                                                            setShowFolderModal(false);
                                                            setSelectedDocumentForFolder(null);
                                                          }}
                                                        >
                                                          <div className="flex items-center gap-2">
                                                            <FolderOutlined className="text-gray-500 text-xs" />
                                                            <span className="text-gray-400">{subSubFolder}</span>
                                                        </div>
                                                          {userSelectedFolders[selectedDocumentForFolder] === fullPath && (
                                                            <CheckOutlined className="text-green-500" />
                                                          )}
                                                      </div>
                                                      );
                                                    })}
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                          </div>
                                        ))}
                                        
                                        <div className="pt-2 border-t border-gray-700">
                                          <Button
                                            type="dashed"
                                            block
                                            onClick={() => {
                                              const customFolder = prompt('Enter custom folder path (e.g., Documents/NewFolder):');
                                              if (customFolder) {
                                                setUserSelectedFolders(prev => ({
                                                  ...prev,
                                                  [selectedDocumentForFolder]: customFolder
                                                }));
                                                message.success(`Custom folder created: ${customFolder}`);
                                                setShowFolderModal(false);
                                                setSelectedDocumentForFolder(null);
                                              }
                                            }}
                                          >
                                            + Create New Folder in Repository
                                          </Button>
                                                </div>
                                            </div>
                                          );
                                      })()}
                                    </div>
                              ) : (
                                // Bulk folder management with repository structure
                                <div>
                                  <div className="text-sm text-gray-300 mb-4">Browse repository and assign folders to documents:</div>
                                  <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {Object.entries(bulkExtractedData).map(([fileName, data], index) => (
                                      <div key={index} className="flex items-center justify-between p-2 border border-gray-700 rounded">
                                        <div className="flex-1 min-w-0">
                                          <div className="text-sm text-gray-300 truncate" title={fileName}>
                                            {fileName}
                                  </div>
                                          <div className="text-xs text-gray-500">
                                            Target: {userSelectedFolders[fileName] || 'Not selected'}
                                          </div>
                                        </div>
                                        <Button
                                          size="small"
                                          onClick={() => {
                                            setSelectedDocumentForFolder(fileName);
                                          }}
                                        >
                                          Select Folder
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Modal>

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
            
            {/* Duplicate Comparison Modal */}
            <Modal
              title="Document Comparison"
              open={showDuplicateModal}
              onCancel={() => {
                setShowDuplicateModal(false);
                setSelectedDuplicateGroup(null);
              }}
              width={900}
              footer={[
                <Button key="cancel" onClick={() => setShowDuplicateModal(false)}>
                  Close
                </Button>
              ]}
            >
              {selectedDuplicateGroup !== null && duplicateGroups[selectedDuplicateGroup] && (
                <div>
                  <Alert
                    message={`${Math.round(duplicateGroups[selectedDuplicateGroup].similarity * 100)}% Similarity Detected`}
                    description="Review the documents below to decide how to handle this duplicate."
                    type="warning"
                    showIcon
                    className="mb-4"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    {duplicateGroups[selectedDuplicateGroup].documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="mb-2">
                          <strong>{doc.isExisting ? 'Existing Document' : 'New Upload'}</strong>
                          {doc.isExisting && <Tag color="blue" className="ml-2">In System</Tag>}
                        </div>
                        <Divider className="my-2" />
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>File Name:</strong> {doc.fileName}
                          </div>
                          <div>
                            <strong>Document Type:</strong> {doc.data.docType}
                          </div>
                          <div>
                            <strong>Parties:</strong> {doc.data.parties?.join(', ') || 'N/A'}
                          </div>
                          <div>
                            <strong>Effective Date:</strong> {doc.data.dates?.effective || 'N/A'}
                          </div>
                          <div>
                            <strong>Expiry Date:</strong> {doc.data.dates?.expiry || 'N/A'}
                          </div>
                          <div>
                            <strong>Status:</strong> <Tag>{doc.data.status || 'Unknown'}</Tag>
                          </div>
                          {doc.data.suggestedFolder && (
                            <div>
                              <strong>Folder:</strong> {doc.data.suggestedFolder}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                                                      <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700">
                    <strong>Recommended Action:</strong>
                    {duplicateGroups[selectedDuplicateGroup].documents.some(d => d.isExisting) ? (
                      <span className="ml-2">Replace existing document if this is an updated version</span>
                    ) : (
                      <span className="ml-2">Keep both if they are different versions or skip if truly duplicate</span>
                    )}
                  </div>
                </div>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
