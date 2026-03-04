export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    // Header
    siteName: 'MAOSHUO CHEN',
    projects: '项目',
    aboutMe: '关于我',
    
    // Home
    homeIntro1: '👋 你好，我是陈茂烁',
    homeIntro2: '我是一名产品设计师',
    
    // About
    aboutTitle: 'About Me',
    name: '陈茂烁 - 产品经理',
    education: '硕士',
    age: '27 岁',
    email: '邮箱',
    phone: '电话',
    
    selfIntroTitle: '自我介绍',
    selfIntroText: '你好，我叫陈茂烁，是一名用户型产品经理，专注于提升产品体验与解决用户问题。',
    
    educationTitle: '教育经历',
    school: '学校',
    degree: '学历',
    major: '专业',
    time: '时间',
    tongjiMaster: '同济大学',
    tongjiBachelor: '同济大学',
    interactionDesign: '交互设计',
    industrialDesign: '工业设计',
    master: '硕士',
    bachelor: '本科',
    
    workTitle: '工作经历',
    alibaba: '阿里巴巴钉钉会议 - 用户型产品经理',
    workPeriod: '2023.07 - 至今',
    
    work1Title: '一、重点负责用户体验，NPS 达到行业 Top 水平 (65→70)',
    work1Item1: '稳定性提升：',
    work1Item1Text: '在弱网与低端设备场景中，设计并落地自适应策略和多层兜底机制，确保音视频切换平滑。',
    work1Item2: '易用性打磨：',
    work1Item2Text: '聚焦 MVP 链路，优化入离会、邀请、共享等关键场景，提高用户使用效率与满意度。',
    work1Item3: 'VOC 反馈闭环：',
    work1Item3Text: '构建需求池管理体系，推动需求池解决率从 30% 提升至 60%，有效提升用户满意度。',
    
    work2Title: '二、主导功能迭代，补齐短板并打造差异化优势',
    work2Item1: '国际化布局：',
    work2Item1Text: '建设全球化会议能力，优化海外入会、字幕翻译、多语言界面适配、同声传译等国际化功能体验，海外入会场次提升 60%。',
    work2Item2: '短板补齐：',
    work2Item2Text: '补齐远程控制、多端入会等多项功能短板，满足用户需求，支撑 10+ 家头部客户从竞品迁移。',
    work2Item3: '创新差异化：',
    work2Item3Text: '创新性推出「电话入会」功能，通过将会议音频切换至电话线路，优化弱网下移动用户体验，DAU 达 6000+，获用户大量好评。',
    
    work3Title: '三、助力商业变现，服务超 30 家 KA 客户，推动千万级营收目标达成',
    work3Item1: '安全可控：',
    work3Item1Text: '面向芯片、精密制造等高保密行业客户，设计并落地内容防泄露、组织管控、策略配置、混合部署等能力，构建企业会议安全方案。',
    work3Item2: '开放集成：',
    work3Item2Text: '构建 API、SDK、三方应用的开放能力矩阵，满足人事招聘、招投标、内部 OA 协同等多样化音视频需求。',
    
    aiTitle: '关于 AI',
    aiText1: '长期关注 AI 技术，并探索 AI Agent 相关实现 (2023.11)。',
    aiText2: '用 Langchain 实现一个基于设计方法论的 AI Agent -- Problem Framer，可输入现实中的复杂问题 (Wicked Problem)，模拟背景调研、利益相关者分析、主题分析和创意发散步骤，产出一篇研究报告。',
    
    // Projects
    paperclipTitle: 'PaperClip',
    paperclipSubtitle: '面向学术研究的纸质知识管理工具',
    minimalismTitle: 'Minimalism',
    minimalismSubtitle: '飞机座椅轻量化设计',
    digitalTwinTitle: 'Industrial 4.0+',
    digitalTwinSubtitle: '人机协作与数字孪生',
    spotlightTitle: 'Spotlight',
    spotlightSubtitle: '未来交通识别系统',
  },
  en: {
    // Header
    siteName: 'MAOSHUO CHEN',
    projects: 'Projects',
    aboutMe: 'About Me',
    
    // Home
    homeIntro1: '👋 Hi, I am Maoshuo Chen',
    homeIntro2: 'I am a Product Designer',
    
    // About
    aboutTitle: 'About Me',
    name: 'Maoshuo Chen - Product Manager',
    education: 'Master\'s Degree',
    age: '27 years old',
    email: 'Email',
    phone: 'Phone',
    
    selfIntroTitle: 'About Me',
    selfIntroText: 'Hello, I\'m Maoshuo Chen, a user-focused product manager dedicated to enhancing product experience and solving user problems.',
    
    educationTitle: 'Education',
    school: 'University',
    degree: 'Degree',
    major: 'Major',
    time: 'Period',
    tongjiMaster: 'Tongji University',
    tongjiBachelor: 'Tongji University',
    interactionDesign: 'Interaction Design',
    industrialDesign: 'Industrial Design',
    master: 'Master',
    bachelor: 'Bachelor',
    
    workTitle: 'Work Experience',
    alibaba: 'Alibaba DingTalk Meeting - User Product Manager',
    workPeriod: '2023.07 - Present',
    
    work1Title: '1. Led User Experience, NPS Reached Industry Top Level (65→70)',
    work1Item1: 'Stability Improvement: ',
    work1Item1Text: 'Designed and implemented adaptive strategies and multi-layer fallback mechanisms for weak network and low-end device scenarios, ensuring smooth audio/video transitions.',
    work1Item2: 'Usability Refinement: ',
    work1Item2Text: 'Focused on MVP workflows, optimized key scenarios like joining/leaving meetings, invitations, and screen sharing, improving user efficiency and satisfaction.',
    work1Item3: 'VOC Feedback Loop: ',
    work1Item3Text: 'Built a requirement pool management system, increased resolution rate from 30% to 60%, effectively improving user satisfaction.',
    
    work2Title: '2. Led Feature Iterations, Addressed Gaps and Created Differentiated Advantages',
    work2Item1: 'Internationalization: ',
    work2Item1Text: 'Built global meeting capabilities, optimized overseas joining, subtitle translation, multi-language UI adaptation, and simultaneous interpretation. Overseas meeting sessions increased by 60%.',
    work2Item2: 'Gap Closure: ',
    work2Item2Text: 'Added remote control, multi-device joining, and other missing features to meet user needs, supporting 10+ enterprise clients to migrate from competitors.',
    work2Item3: 'Innovative Differentiation: ',
    work2Item3Text: 'Innovatively launched "Phone Join" feature, switching meeting audio to phone lines to optimize mobile experience under weak networks. DAU reached 6000+, received extensive user praise.',
    
    work3Title: '3. Supported Commercial Monetization, Served 30+ KA Clients, Drove 10M+ Revenue Goals',
    work3Item1: 'Security & Control: ',
    work3Item1Text: 'For high-security industries like chip and precision manufacturing, designed and implemented content leak prevention, organization control, policy configuration, and hybrid deployment capabilities.',
    work3Item2: 'Open Integration: ',
    work3Item2Text: 'Built open capability matrix of API, SDK, and third-party applications, meeting diverse audio/video needs for HR recruitment, bidding, internal OA collaboration, etc.',
    
    aiTitle: 'About AI',
    aiText1: 'Long-term focus on AI technology and exploration of AI Agent implementations (since Nov 2023).',
    aiText2: 'Built Problem Framer, an AI Agent based on design methodology using Langchain. It takes complex real-world problems (Wicked Problems) as input, simulates background research, stakeholder analysis, thematic analysis, and creative brainstorming steps, and produces a research report.',
    
    // Projects
    paperclipTitle: 'PaperClip',
    paperclipSubtitle: 'Paper Knowledge Management Tool for Academic Research',
    minimalismTitle: 'Minimalism',
    minimalismSubtitle: 'Aircraft Seats Lightweight Design',
    digitalTwinTitle: 'Industrial 4.0+',
    digitalTwinSubtitle: 'Human-Machine Collaboration & Digital Twin',
    spotlightTitle: 'Spotlight',
    spotlightSubtitle: 'Future Transit Recognition System',
  },
} as const;

export type TranslationKey = keyof typeof translations.zh;
