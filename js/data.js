const subsystems = [
    { id: "ad",       name: "Attack/Defense",         cardId: "SYS-1099-AD", icon: "assets/domain-logos/atk-def.png",      flavor: "Digital chess, where every move is critical.",   desc: "Dual-focus domain combining offensive security (vulnerability discovery, exploitation) with defensive operations (system hardening, incident response). Requires expertise in network protocols, system architecture, and advanced security tools for both attack simulation and defense.", tools: ["Metasploit", "Cobalt Strike", "Wireshark"], counter: "IDS/IPS, Threat Intel, Patching." },
    { id: "binexp",   name: "Binary Exploitation",    cardId: "SYS-0421-BE", icon: "assets/domain-logos/binex.png",      flavor: "Making programs dance to our tune.",             desc: "Advanced software exploitation focusing on memory corruption and binary analysis. Involves crafting exploits for buffer overflows, format strings, and use-after-free vulnerabilities. Requires expertise in assembly, memory management, and modern protections.", tools: ["GDB", "IDA Pro", "pwntools"], counter: "ASLR, DEP, Stack Canaries." },
    { id: "crypto",   name: "Cryptography",           cardId: "SYS-3141-CR", icon: "assets/domain-logos/crypto.png",   flavor: "Secrets encoded, puzzles to be unraveled.",      desc: "Mathematical security through encryption and authentication. Covers classical ciphers, modern cryptography (RSA, ECC), and implementation security. Analyzes cryptographic vulnerabilities including side-channel attacks and protocol weaknesses.", tools: ["CrypTool", "Hashcat", "SageMath"], counter: "Strong algorithms, proper implementation." },
    { id: "forensics",name: "Digital Forensics",      cardId: "SYS-8008-DF", icon: "assets/domain-logos/forensic.png", flavor: "Sifting through the digital ashes for truth.",   desc: "Digital evidence analysis through file system forensics, memory analysis, and network traffic investigation. Focuses on data recovery, timeline reconstruction, and malware analysis using industry-standard forensic tools.", tools: ["Autopsy", "Volatility", "FTK Imager"], counter: "Log retention, disk imaging, anti-tamper." },
    { id: "hardware", name: "Hardware Security",      cardId: "SYS-9001-HW", icon: "assets/domain-logos/hardware.png",      flavor: "Where silicon meets exploit.",                   desc: "Physical device security through firmware analysis, side-channel attacks, and hardware interfaces. Uses specialized equipment for signal analysis and fault injection. Combines electrical engineering with security principles.", tools: ["Bus Pirate", "JTAGulator", "ChipWhisperer"], counter: "Secure boot, anti-tamper hardware." },
    { id: "research", name: "Research and AI",        cardId: "SYS-0001-RD", icon: "assets/domain-logos/research.png", flavor: "Charting the unknown territories of cyber.",     desc: "Explores the convergence of AI and cybersecurity. Develops AI-powered security solutions while researching adversarial machine learning and AI vulnerabilities. Advances both pure AI applications and core cybersecurity through innovative research.", tools: ["TensorFlow", "PyTorch", "Custom ML Models"], counter: "Proactive analysis, threat modeling." },
    { id: "reveng",   name: "Reverse Engineering",    cardId: "SYS-1234-RE", icon: "assets/domain-logos/reverse.png",      flavor: "Taking things apart to see how they tick.",      desc: "Analyzes compiled software through decompilation, debugging, and code reconstruction. Focuses on malware analysis and vulnerability discovery. Requires mastery of assembly, debugging tools, and operating system internals.", tools: ["Ghidra", "x64dbg", "IDA Pro"], counter: "Obfuscation, anti-debug techniques." },
    { id: "webexp",   name: "Web Exploitation",       cardId: "SYS-8080-WE", icon: "assets/domain-logos/webex.png",      flavor: "The wild west of the internet, tamed.",          desc: "Web application security through vulnerability assessment and exploitation. Masters SQL injection, XSS, auth bypass, and API security. Combines automated scanning with manual analysis of web technologies.", tools: ["Burp Suite", "sqlmap", "OWASP ZAP"], counter: "Input sanitization, WAF, secure coding." },
    { id: "mgmt",     name: "Management",             cardId: "SYS-5000-OD", icon: "assets/domain-logos/mgmt.png",     flavor: "The architects and conductors of the symphony.", desc: "Orchestrates cybersecurity operations and cross-domain projects. Specializes in technical project management, security event coordination, and industry partnerships. Bridges technical expertise with organizational efficiency.", tools: ["Trello", "Discord", "Figma"], counter: "Clear communication, agile methods." }
];

const boardMembers = [
    {
        name: "Barri Harshith",
        alias: "{wixter_07}",
        role: "Team Leader",
        avatar: "assets/board-photos/25-26/harshith-leader.webp",
        linkedin: "https://www.linkedin.com/in/barri-harshith-5196a7252/",
        github: "https://github.com/Wixter07",
        instagram: "https://www.instagram.com/sort_of_an_individualist/",
        quote: "{wixter_07}",
        domains: ["Leadership", "Reverse Engineering", "Cryptography", "Attack/Defense"]
    },
    {
        name: "Satwik Shreshtha",
        alias: "{xenon}",
        role: "Team Manager",
        avatar: "assets/board-photos/25-26/satwik-manager.webp",
        linkedin: "https://www.linkedin.com/in/satwik-shreshtha-8592ab285/",
        github: "https://github.com/s4twik",
        instagram: "https://www.instagram.com/s4twk/",
        quote: "{xenon}",
        domains: ["Management", "Digital Forensics", "Hardware Security"]
    },
    {
        name: "Madhav Menon",
        alias: "{ice_lemon}",
        role: "Cryptography Head",
        avatar: "assets/board-photos/25-26/madhav-crypto.webp",
        linkedin: "https://www.linkedin.com/in/madhav-menon-2k6/",
        github: "https://github.com/IC3lemon",
        instagram: "https://www.instagram.com/ice.incarnate/",
        quote: "{ice_lemon}",
        domains: ["Cryptography", "Reverse Engineering"]
    },
    {
        name: "Aayush Barhate",
        alias: "{al1a5}",
        role: "Reverse Engineering Head",
        avatar: "assets/board-photos/25-26/aayush-reverse.webp",
        linkedin: "https://www.linkedin.com/in/aayushbarhate/",
        github: "https://github.com/AayushBarhate",
        instagram: "https://www.instagram.com/aayush.barhate/",
        quote: "{al1a5}",
        domains: ["Reverse Engineering", "Digital Forensics", "Hardware Security", "Network Security"]
    },
    {
        name: "Adriteyo Das",
        alias: "{tryhard}",
        role: "Research & AI Head",
        avatar: "assets/board-photos/25-26/adriteyo-research.webp",
        linkedin: "https://www.linkedin.com/in/adriteyo-das/",
        github: "https://github.com/Addy-Da-Baddy",
        instagram: "https://www.instagram.com/addyction__/",
        quote: "{tryhard}",
        domains: ["Research", "Artificial Intelligence", "Digital Forensics"]
    },
    {
        name: "Jayapal Ashwin Nair",
        alias: "{crabsnk}",
        role: "Binary Exploitation Head",
        avatar: "assets/board-photos/25-26/ashwin-binex.webp",
        linkedin: "https://www.linkedin.com/in/ashwin-nair-33277b276/",
        github: "https://github.com/oxo-crab",
        instagram: "https://www.instagram.com/4sh_saysstarcorrection/",
        quote: "{crabsnk}",
        domains: ["Binary Exploitation"]
    },
    {
        name: "Krish Pandey",
        alias: "{vikaran}",
        role: "Attack/Defense & Hardware Security Head",
        avatar: "assets/board-photos/25-26/krish-hardware-ad.webp",
        linkedin: "https://www.linkedin.com/in/krish-pandey-0bba4133b/",
        github: "https://github.com/vikaran101",
        instagram: "https://www.instagram.com/krees_baba/",
        quote: "{vikaran}",
        domains: ["Attack/Defense", "Hardware Security", "Reverse Engineering", "Web Exploitation"]
    },
    {
        name: "Lakshit Verma",
        alias: "{lvert}",
        role: "Forensics Head",
        avatar: "assets/board-photos/25-26/lakshit-forensics.webp",
        linkedin: "https://linkedin.com/in/lakshitverma",
        github: "https://github.com/vee1e",
        instagram: "https://instagram.com/lakshitdotverma",
        quote: "{lvert}",
        domains: [ "Digital Forensics", "Reverse Engineering", "Hardware Security", ]
    },
    {
        name: "Rishabh Bachhawat",
        alias: "{mrrobot404}",
        role: "Web Exploitation Head",
        avatar: "assets/board-photos/25-26/rishabh-webex.webp",
        linkedin: "https://www.linkedin.com/in/rishabh-bachhawat-505877284/",
        github: "https://github.com/CoderZonora",
        instagram: "",
        quote: "{mrrobot404}",
        domains: ["Web Exploitation", "Infrastructure"]
    },
];

const boardMembers3rdYear = [
    { name: "Aditya Ram Sharma",          alias: "{snapskillz}",     avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Adwait Gupta",               alias: "{pookiemon}",      avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Ashmit Sugoor",              alias: "{ashmit}",         avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Dhruva Deepak",              alias: "{kua}",            avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Guru Asrith Nakka",          alias: "{masterraider}",   avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Kaaviya Kalyanakumar",       alias: "{enigmatronix13}", avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Meeti Mehta",                alias: "{mm}",             avatar: "", github: "", instagram: "",},
    { name: "Misha Jain",                 alias: "{notamilkshake}",  avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Poorvi Kanodia",             alias: "{Lun4n1v3rs3}",    avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Shantanu Bhargava",          alias: "{hackerone}",      avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Shreyith Gomes",             alias: "{shrey_07}",       avatar: "", linkedin: "", github: "", instagram: "",},
    { name: "Uttam Singh Somvanshi",      alias: "{azure}",          avatar: "", linkedin: "", github: "", instagram: "",},
];

const subsystemsGrid = document.getElementById('subsystems-grid');

const createSubsystemCards = () => {
    subsystemsGrid.innerHTML = '';

    if (window.innerWidth <= 900) {
        const mobileList = document.createElement('ul');
        mobileList.classList.add('subsystem-card-mobile-list');

        subsystems.forEach(sub => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <img src="${sub.icon}" alt="${sub.name} Icon" class="domain-icon" loading="lazy" decoding="async" onerror="this.style.display='none'">
                <div class="domain-info">
                    <div class="domain-name">${sub.name}</div>
                    <div class="domain-desc">${sub.flavor || ''}</div>
                </div>
            `;

            mobileList.appendChild(listItem);
        });

        subsystemsGrid.appendChild(mobileList);
    } else {
        subsystems.forEach(sub => {
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('subsystem-card');

            const toolsList = sub.tools ? `Using tools like ${sub.tools.join(', ')}.` : '';
            const detailedDescription = `${sub.desc} ${toolsList}`;

            cardWrapper.innerHTML = `
                <div class="card-3d">
                    <div class="subsystem-card-front">
                        <div class="absolute top-2 right-2 text-xs font-accent text-[var(--color-text-muted)] opacity-70">${sub.cardId || 'N/A'}</div>
                        <img src="${sub.icon}" alt="${sub.name} Icon" class="subsystem-card-icon" loading="lazy" decoding="async" onerror="this.style.display='none'">
                        <div>
                            <h3 class="subsystem-card-title">${sub.name}</h3>
                            <p class="subsystem-card-flavor-text">${sub.flavor || ''}</p>
                        </div>
                    </div>
                    <div class="subsystem-card-hover">
                        <p class="subsystem-card-description">${detailedDescription}</p>
                    </div>
                </div>
            `;
            subsystemsGrid.appendChild(cardWrapper);
        });
    }
};

if (subsystemsGrid) createSubsystemCards();

let isMobileLayout = window.innerWidth <= 900;
let resizeTimerId = null;
function handleResizeOptimized() {
    const nowMobile = window.innerWidth <= 900;
    if (nowMobile !== isMobileLayout) {
        isMobileLayout = nowMobile;
        if (subsystemsGrid) createSubsystemCards();
        if (teamGrid) createTeamCards();
        createBoardMembersCards();
        if (alumniGrid) renderAlumniCards(sortedAlumniData);
    }
}
window.addEventListener('resize', () => {
    if (resizeTimerId) clearTimeout(resizeTimerId);
    resizeTimerId = setTimeout(handleResizeOptimized, 150);
});

const achievements = {
    ctfPerformance: [
        { event: "NCIIPC & AICTE Pentathon 2025 @ (GGSIPU) Delhi", result: "1st Place", prize: "2,50,000 INR" },
        { event: "BSides Bangalore — B5 + W2 (Wonder Woman) CTF", result: "1st & 2nd Place", prize: "15,000 + 7,000 INR total" },
        { event: "GIT X IIT Bombay Trust Lab CTF 2025", result: "1st Place", prize: "25,000 INR" },
        { event: "CRAW CTF @ IIT Jodhpur, Prometeo", result: "1st Place", prize: "25,000 INR" },
        { event: "RVCE X IIT Bombay Trust Lab CTF 2024", result: "2nd Place", prize: "30,000 INR" }
    ],
    ctfRankings: [
        { label: "Current India Rank", value: "#2" },
        { label: "Previous Year India Rank", value: "#3" },
        { label: "Global Rank", value: "#28" },
        { label: "Global Rank (among college teams)", value: "#10" }
    ],
    hackathons: [
        { event: "Smart India Hackathon 2024 @ Indian Institute of Technology Jammu", result: "1st Place", prize: "1,00,000 INR" },
        { event: "Smart India Hackathon 2023 @ NIET Noida", result: "1st Place", prize: "1,00,000 INR" },
        { event: "Data Security Council of India (DSCI) Cyber Grand Challenge", result: "Qualified for Ideation stage", prize: "5,00,000 INR" },
        { event: "AICS ICONIP CyberAI Cup 2024", result: "3rd Place", prize: "1000 NZD — 51,000 INR" },
        { event: "AICS ICONIP CyberAI Cup 2023", result: "1st Place", prize: "3000 NZD — 1,53,000 INR" },
        { event: "Cyber Crimes Conclave, IISc Bangalore", result: "2nd Place", prize: "1,00,000 INR" }
    ]
};

const teamGrid = document.getElementById('team-grid');

const createTeamCards = () => {
    teamGrid.innerHTML = '';

    if (window.innerWidth <= 900) {
        const mobileList = document.createElement('ul');
        mobileList.classList.add('member-card-mobile-list');

        boardMembers.forEach((member, index) => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <img src="${member.avatar}" class="member-icon" loading="lazy" decoding="async" onerror="this.style.display='none'">
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
            `;

            mobileList.appendChild(listItem);
        });

        teamGrid.appendChild(mobileList);
    } else {
        boardMembers.forEach((member, index) => {
            const slateWrapper = document.createElement('div');
            slateWrapper.classList.add('member-slate');

            let socialLinksHTML = `<a href="${member.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                                 <a href="${member.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>`;
            if (member.instagram) {
                socialLinksHTML += ` <a href="${member.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>`;
            }

            let domainsHTML = '<div class="member-domains my-2">';
            if (member.domains && member.domains.length) {
                member.domains.forEach(domain => {
                    const domainClass = domain.toLowerCase().replace(/[^a-z]/g, '-');
                    domainsHTML += `<span class="domain-badge ${domainClass}">${domain}</span>`;
                });
            }
            domainsHTML += '</div>';

            slateWrapper.innerHTML = `
                <div class="card-3d member-card-custom">
                    <div class="card-3d-content">
                        <img src="${member.avatar}" class="member-avatar" loading="lazy" decoding="async">
                        <div class="member-name-container">
                            <h4 class="member-name real-name">${member.name}</h4>
                            <h4 class="member-name hacker-alias glitch-text">${member.alias}</h4>
                        </div>
                        <p class="member-role">${member.role}</p>
                        <p class="member-quote">${member.quote}</p>
                        ${domainsHTML}
                        <div class="member-socials mt-auto">${socialLinksHTML}</div>
                    </div>
                </div>
            `;
            teamGrid.appendChild(slateWrapper);
        });
    }
};

const createBoardMembersCards = () => {
    const boardMembersGrid = document.getElementById('board-members-grid');
    if (!boardMembersGrid) return;

    boardMembersGrid.innerHTML = '';

    if (window.innerWidth <= 900) {
        const mobileList = document.createElement('ul');
        mobileList.classList.add('board-members-mobile-list');

        boardMembers3rdYear.forEach((member, index) => {
            const listItem = document.createElement('li');

            listItem.innerHTML = `
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                </div>
            `;

            mobileList.appendChild(listItem);
        });

        boardMembersGrid.appendChild(mobileList);
    } else {
        boardMembers3rdYear.forEach((member, index) => {
            const slateWrapper = document.createElement('div');
            slateWrapper.classList.add('board-member-slate');

            const isLongAlias = member.alias.length > 15;
            slateWrapper.innerHTML = `
                <div class="card-3d board-member-card">
                    <div class="card-3d-content">
                        <div class="member-name-container">
                            <h4 class="member-name real-name">${member.name}</h4>
                            <h4 class="member-name hacker-alias glitch-text ${isLongAlias ? 'long-text' : ''}">${member.alias}</h4>
                        </div>
                        <p class="member-role">Board Member</p>
                        ${member.domains ? `<div class="member-domains my-2">
                            ${member.domains.map(domain => `<span class="domain-badge ${domain.toLowerCase().replace(/[^a-z]/g, '-')}">${domain}</span>`).join('')}
                        </div>` : ''}
                    </div>
                </div>
            `;
            boardMembersGrid.appendChild(slateWrapper);
        });
    }
};

const achievementsGrid = document.getElementById('achievements-grid');
if (achievementsGrid) {
    const ctfPerformanceHTML = achievements.ctfPerformance.map(item =>
        `<li class="achievement-item"><strong>${item.event}:</strong> ${item.result}${item.prize ? ` (${item.prize})` : ''}</li>`
    ).join('');

    const ctfRankingsHTML = achievements.ctfRankings.map(item =>
        `<div class="ctf-ranking-card">
            <div class="ranking-label">${item.label}</div>
            <div class="ranking-value">${item.value}</div>
        </div>`
    ).join('');

    const hackathonsHTML = achievements.hackathons.map(item =>
        `<li class="achievement-item"><strong>${item.event}:</strong> ${item.result} (${item.prize})</li>`
    ).join('');

    achievementsGrid.innerHTML = `
        <div class="achievements-container">
            <div class="achievement-section">
                <h3 class="section-title">CTF Rankings</h3>

                <div class="ctf-rankings-grid">
                    ${ctfRankingsHTML}
                </div>
            </div>

            <div class="achievement-section">
                <h3 class="section-title">CTF Performance</h3>
                <ul class="achievement-list">${ctfPerformanceHTML}</ul>
            </div>

            <div class="achievement-section">
                <h3 class="section-title">Hackathons & Competitions</h3>
                <ul class="achievement-list">${hackathonsHTML}</ul>
            </div>

            <div class="achievement-section">
                <div class="ctftime-card">
                    <a href="https://ctftime.org/team/62713/" target="_blank" class="ctftime-link" aria-label="View CTFtime Profile">
                        <img src="assets/logos/ctftime.svg" alt="CTFTime" class="ctftime-logo" loading="lazy" decoding="async">
                        <span>View our CTFTime Profile</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

if (teamGrid) createTeamCards();
createBoardMembersCards();

const alumniData = [
    { name: "Bhavya Sharma",            batch: "2021", current: "Deustche Bank",              position: "team leader",              linkedin: "https://www.linkedin.com/in/bhvya1505/" },
    { name: "Numan Zaheer Ahmed",       batch: "2021", current: "VMware",                     position: "technical head",           linkedin: "https://www.linkedin.com/in/anutrix" },
    { name: "Abhay Nayar",              batch: "2021", current: "Amazon",                     position: "reverse engineering head", linkedin: "https://www.linkedin.com/in/abhaynayar/" },
    { name: "Abhishek Rao",             batch: "2023", current: "GE Healthcare",              position: "-",                        linkedin: "https://www.linkedin.com/in/abhishekrao05/" },
    { name: "Akshat Punjabi",           batch: "2023", current: "Texas A&M University",       position: "-",                        linkedin: "https://www.linkedin.com/in/akshat-punjabi/" },
    { name: "Aman Priyanshu",           batch: "2023", current: "Carnegie Mellon University", position: "technical head",           linkedin: "https://www.linkedin.com/in/aman-priyanshu/" },
    { name: "Sai Charan Teja Ande",     batch: "2023", current: "Cisco",                      position: "-",                        linkedin: "https://www.linkedin.com/in/sai-charan-teja-ande/" },
    { name: "Cynthia Maria Dsouza",     batch: "2023", current: "McKinsey & Company",         position: "team manager",             linkedin: "https://www.linkedin.com/in/cynthia-maria-dsouza/" },
    { name: "Garvit Arora",             batch: "2023", current: "Juniper Networks",           position: "-",                        linkedin: "https://www.linkedin.com/in/garvitarora01/" },
    { name: "Haseeb Khalid",            batch: "2023", current: "CloudDefense.AI",            position: "web exploitation head",    linkedin: "https://www.linkedin.com/in/haseebkhalid1507/" },
    { name: "Kvk Praneeth",             batch: "2023", current: "Black Coffee Robotics",      position: "-",                        linkedin: "https://www.linkedin.com/in/pkvk" },
    { name: "Sohom Datta",              batch: "2023", current: "PhD at NCSU",                position: "reverse engineering head", linkedin: "https://www.linkedin.com/in/sohom-datta-c29ob20k/" },
    { name: "Kaustubh Mangalwedhekar",  batch: "2023", current: "Microsoft",                  position: "cryptography head",        linkedin: "https://www.linkedin.com/in/kaustubh3574/" },
    { name: "Lekhya Reddy",             batch: "2023", current: "Adobe",                      position: "-",                        linkedin: "https://www.linkedin.com/in/lekhya-reddy-1676911a5/" },
    { name: "Nithin Chowdary Garapati", batch: "2023", current: "Cisco",                      position: "-",                        linkedin: "https://www.linkedin.com/in/nithin-chowdary-garapati-795432192/" },
    { name: "Rajat Agarwal",            batch: "2023", current: "WellsFargo",                 position: "attack/defense head",      linkedin: "https://www.linkedin.com/in/rajat18agarwal/" },
    { name: "Rasesh Rajpopat",          batch: "2023", current: "Sabre India",                position: "-",                        linkedin: "https://www.linkedin.com/in/rasesh-rajpopat-a577111b1" },
    { name: "Romit Bhandra",            batch: "2023", current: "HPE Aruba",                  position: "-",                        linkedin: "https://www.linkedin.com/in/romit-bhadra-343b3a240/" },
    { name: "Sourav Guruprasad",        batch: "2023", current: "Dayforce",                   position: "-",                        linkedin: "https://www.linkedin.com/in/sourav-guruprasad-36916331b/" },
    { name: "Tejas Arora",              batch: "2023", current: "Oracle",                     position: "-",                        linkedin: "https://www.linkedin.com/in/tejas-arora-551781188/" },
    { name: "Ujjwal Singhal",           batch: "2023", current: "Long Angle",                 position: "-",                        linkedin: "https://www.linkedin.com/in/ujjwal83/" },
    { name: "Kunyalik Garg",            batch: "2024", current: "Palo Alto Networks",         position: "team leader",              linkedin: "https://www.linkedin.com/in/kunyalik/" },
    { name: "Rayhan Faizel",            batch: "2024", current: "GSoC @ libvirt",             position: "binary exploitation head", linkedin: "https://www.linkedin.com/in/rayhan-f-2933281b3/" },
    { name: "Rohan Vinod Pol",          batch: "2024", current: "Google",                     position: "-",                        linkedin: "https://www.linkedin.com/in/rohan2182/" },
    { name: "Luhit Atluri",             batch: "2024", current: "ABB",                        position: "cryptography head",        linkedin: "https://www.linkedin.com/in/luhit/" },
    { name: "Daksh Dadhania",           batch: "2025", current: "Optum",                      position: "web exploitation head",    linkedin: "https://www.linkedin.com/in/dakshdadhania/" },
    { name: "Dhruthi Kumar",            batch: "2025", current: "AQR Capital Management",     position: "cryptography head",        linkedin: "https://www.linkedin.com/in/dhruthi-k-60998b236/" },
    { name: "Aditi Kulkarni",           batch: "2025", current: "PayU",                       position: "research head",            linkedin: "https://www.linkedin.com/in/aditi-kulkarni-393568229/" },
    { name: "Pulkit Madhan",            batch: "2025", current: "Moveworks",                  position: "-",                        linkedin: "https://www.linkedin.com/in/pulkit-madan-72b325268/" },
    { name: "Prabhakar Dev",            batch: "2025", current: "Sabre India",                position: "technical head",           linkedin: "https://www.linkedin.com/in/prabhakar-dev-6633b81b7/" },
    { name: "Shreyansh Sankrit",        batch: "2025", current: "Jio InfoComm",               position: "team leader",              linkedin: "https://www.linkedin.com/in/shreyansh-sankrit/" },
    { name: "Siddharth Mittal",         batch: "2025", current: "NCIIPC",                     position: "forensics head",           linkedin: "https://www.linkedin.com/in/siddharth-mittal-/" },
    { name: "Shreyas BS",               batch: "2025", current: "ISAC",                       position: "networking head",          linkedin: "https://www.linkedin.com/in/shreyas1860/" },
    { name: "Sriyans Ketavarapu",       batch: "2025", current: "FIS Global",                 position: "ai head",                  linkedin: "https://www.linkedin.com/in/sriyansketavarapu/" },
    { name: "Kumud Rathore",            batch: "2025", current: "ServiceNow",                 position: "team manager",             linkedin: "https://www.linkedin.com/in/knowkumud/" },
    { name: "Avanish Money Srivats",    batch: "2026", current: "ARM",                        position: "research head",            linkedin: "https://www.linkedin.com/in/avanish-money-srivats-9bb362234/" },
    { name: "Gurmann Ajmani",           batch: "2026", current: "Amazon",                     position: "ai head",                  linkedin: "https://www.linkedin.com/in/gurmann-singh-ajmani-a80a31262/" },
    { name: "Prashant K",        batch: "2026", current: "NetApp",                     position: "team leader",              linkedin: "https://www.linkedin.com/in/prashanth-j-kumar/" },
    { name: "Ishan Surana",             batch: "2026", current: "AQR Capital Management",     position: "-",                        linkedin: "https://www.linkedin.com/in/ishansurana/" },
    { name: "Ansh Goyal",               batch: "2026", current: "Dassault Systèmes",          position: "team manager",             linkedin: "https://www.linkedin.com/in/ansh-goyal/" },
    { name: "Nishant Gunda",            batch: "2026", current: "Cisco",                      position: "binary exploitation head", linkedin: "https://www.linkedin.com/in/nishant-gunda-96530b250/" },
    { name: "Tanmay Saxena",            batch: "2026", current: "Adani Group",                position: "cryptography head",        linkedin: "https://www.linkedin.com/in/tanmay-saxena-76aa85274/" },
    { name: "Yogesh Prashant Rane",     batch: "2026", current: "Cisco",                      position: "forensics head",           linkedin: "https://www.linkedin.com/in/yogesh-rane-1b1064253/" },
    { name: "Rigved Waradpande",        batch: "2026", current: "Philips",                    position: "-",                        linkedin: "https://www.linkedin.com/in/rigved-waradpande-b0b147253/" },
    { name: "Yvsr Akash",               batch: "2026", current: "ARM",                        position: "attack/defense head",      linkedin: "https://www.linkedin.com/in/yvsr-akash-995847184/" },
    { name: "Rupak Banerjee",           batch: "2026", current: "CloudDefense.AI",            position: "web exploitation head",    linkedin: "https://www.linkedin.com/in/rupak-banerjee-61509727b/" },
    { name: "Uday Ojha",                batch: "2026", current: "PGI Data",                   position: "reverse engineering Head", linkedin: "https://www.linkedin.com/in/uday-o/" }
];

const alumniGrid = document.getElementById('alumni-grid');
const alumniSearchInput = document.getElementById('alumni-search');

const renderAlumniCards = (list) => {
    if (!alumniGrid) return;
    alumniGrid.innerHTML = '';

    if (window.innerWidth <= 900) {
        const mobileList = document.createElement('ul');
        mobileList.classList.add('alumni-mobile-list');

        list.forEach(alum => {
            const listItem = document.createElement('li');
            listItem.classList.add(`batch-${alum.batch}`);
            listItem.innerHTML = `
                <div class="member-info">
                    <div class="member-name">${alum.name}</div>
                    <div class="member-role">${alum.position && alum.position !== '-' ? alum.position : 'Member'}</div>
                    <div class="member-current">${alum.current}</div>
                    <span class="member-batch">Batch of ${alum.batch}</span>
                    ${alum.linkedin ? `<a href="${alum.linkedin}" target="_blank" class="member-linkedin"><i class="fab fa-linkedin"></i></a>` : ''}
                </div>
            `;
            mobileList.appendChild(listItem);
        });

        alumniGrid.appendChild(mobileList);
    } else {
        list.forEach(alum => {
            const slateWrapper = document.createElement('div');
            slateWrapper.classList.add('alumni-slate', `batch-${alum.batch}`);
            slateWrapper.innerHTML = `
                <div class="card-3d alumni-card">
                    <div class="card-3d-content">
                        <h4 class="member-name">${alum.name}</h4>
                        <p class="member-role">${alum.position && alum.position !== '-' ? alum.position : 'Member'}</p>
                        <p class="member-company">${alum.current}</p>
                        <div class="member-skills">
                            <span class="skill-badge">Batch of ${alum.batch}</span>
                            ${alum.batch === '2021' ? '<span class="founding-badge">Founding Batch</span>' : ''}
                        </div>
                        ${alum.linkedin ? `<a href="${alum.linkedin}" target="_blank" class="member-linkedin"><i class="fab fa-linkedin"></i></a>` : ''}
                    </div>
                </div>
            `;
            alumniGrid.appendChild(slateWrapper);
        });
    }
};

const sortedAlumniData = alumniData.sort((a, b) => {
    if (a.batch !== b.batch) {
        return parseInt(b.batch) - parseInt(a.batch);
    }
    return a.name.localeCompare(b.name);
});

if (alumniGrid) {
    renderAlumniCards(sortedAlumniData);
}

if (alumniSearchInput && alumniGrid) {
    alumniSearchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = sortedAlumniData.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.batch.toLowerCase().includes(q) ||
            a.current.toLowerCase().includes(q) ||
            (a.position || '').toLowerCase().includes(q)
        );
        renderAlumniCards(filtered);
    });
}
