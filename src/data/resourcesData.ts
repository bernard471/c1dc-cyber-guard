export const resourcesData = {
    tips: [
      {
        id: 'password-security',
        title: 'Password Security',
        description: 'Use strong, unique passwords and enable two-factor authentication.',
        fullContent: {
          mainDescription: 'Password security is your first line of defense against cyber attacks.',
          keyPoints: [
            'Use at least 12 characters mixing letters, numbers, and symbols',
            'Never reuse passwords across different accounts',
            'Enable two-factor authentication whenever possible',
            'Use a password manager to generate and store complex passwords',
            'Change passwords regularly, especially after security breaches'
          ],
          bestPractices: [
            'Avoid using personal information in passwords',
            'Don\'t share passwords across devices or with others',
            'Use biometric authentication when available'
          ],
          tools: [
            'LastPass - Password Manager',
            'Google Authenticator - 2FA',
            'Authy - Multi-device 2FA'
          ]
        }
      },

      {
        id: 'social-media-safety',
        title: 'Social Media Safety',
        description: 'Protect your privacy with proper security settings and be cautious with sharing.',
        fullContent: {
            mainDescription: 'Two-factor authentication (2FA) is a crucial security feature that adds an extra layer of protection to your social media accounts. Learn how to enable 2FA on popular platforms to secure your online presence.',
            keyPoints: [
                'WhatsApp: Uses two-step verification with a PIN system',
                'Instagram: Offers both authentication app and SMS options',
                'TikTok: Provides phone and email verification methods',
                'Facebook: Supports multiple 2FA methods including security keys'
            ],
            bestPractices: [
                'Use authentication apps instead of SMS when possible',
                'Keep recovery email addresses up to date',
                'Store backup codes in a safe place',
                'Enable 2FA on all platforms that offer it',
                'Regularly review your security settings'
            ],
            tools: [
                'Google Authenticator',
                'Authy',
                'Microsoft Authenticator',
                'YubiKey (for Facebook)'
            ],
            platformGuides: {
                whatsapp: [
                    'Open WhatsApp and go to Settings',
                    'Tap Account > Two-step verification',
                    'Tap Enable',
                    'Enter a six-digit PIN and confirm it',
                    'Provide an email address for recovery',
                    'Tap Save or Done'
                ],
                instagram: [
                    'Open Instagram and go to your Profile',
                    'Tap the three lines in the top right corner > Settings',
                    'Tap Security > Two-factor authentication',
                    'Choose Authentication app or SMS method',
                    'Follow the on-screen instructions'
                ],
                tiktok: [
                    'Open TikTok and go to your Profile',
                    'Tap the three lines in the top right corner > Settings and privacy',
                    'Tap Security > 2-step verification',
                    'Choose phone number or email method',
                    'Follow the on-screen instructions'
                ],
                facebook: [
                    'Open Facebook and go to Settings & Privacy',
                    'Tap Settings > Security and Login',
                    'Under "Two-factor authentication," tap Use two-factor authentication',
                    'Choose from: Authentication app, SMS, or Security Keys',
                    'Follow the on-screen instructions'
                ]
            }
        }
    },
    {
      id: 'online-banking-protection',
      title: 'Online Banking Protection',
      description: 'Never share OTPs or banking credentials. Verify transaction details carefully.',
      fullContent: {
          mainDescription: 'Protecting your online banking activities is crucial in preventing financial fraud and unauthorized access to your accounts. Understanding OTP security and implementing proper safety measures can help safeguard your financial transactions.',
          keyPoints: [
              'Strong Passwords: Use unique, complex passwords for each account',
              '2FA: Enable two-factor authentication whenever possible',
              'Device Security: Keep devices updated with security software',
              'Phishing Awareness: Be wary of suspicious emails and calls',
              'Secure Networks: Avoid public Wi-Fi for banking',
              'Website Check: Look for "https://" and the padlock icon',
              'Account Monitoring: Regularly review transactions',
              'Proper Logout: Always log out completely'
          ],
          bestPractices: [
              'Never share OTPs with anyone, including bank staff',
              'Use authenticator apps instead of SMS for OTPs',
              'Review transaction details before entering OTP',
              'Keep your phone secure with biometric lock',
              'Report suspicious activities immediately',
              'Avoid banking on public Wi-Fi networks',
              'Keep contact information up to date with bank'
          ],
          tools: [
              'Antivirus Software',
              'VPN Services',
              'Password Managers',
              'Authenticator Apps (Google/Microsoft)',
              'Mobile Security Apps'
          ],
          otpGuidelines: {
              general: [
                  'Never share OTPs with anyone under any circumstances',
                  'Banks never ask for OTPs via call/email/text',
                  'Use OTPs promptly as they expire quickly',
                  'Verify transaction details before using OTP'
              ],
              securityMeasures: [
                  'Install and update security software',
                  'Use VPN for added security',
                  'Keep browsers updated',
                  'Download only from trusted sources',
                  'Shred sensitive documents',
                  'Report suspicious activity immediately'
              ],
              otpProtection: [
                  'Use authenticator apps instead of SMS',
                  'Keep phone secure with strong passcode',
                  'Be aware of SIM swap scams',
                  'Monitor for unexpected OTPs',
                  'Verify OTP source authenticity'
              ]
          }
      }
  },
  
    ],

    guides: [
      {
          id: 'digital-security-guide',
          title: 'Digital Security Guide',
          description: 'Comprehensive guide to protecting your digital life.',
          fullContent: {
              title: 'A Comprehensive Digital Security Guide',
              introduction: 'In today\'s interconnected world, our digital lives are intertwined with our physical ones. Protecting your digital presence is no longer a luxury, but a necessity.',
              chapters: [
                  {
                      title: 'Foundational Principles',
                      content: [
                          'Awareness: Understanding common threats like phishing, malware, and identity theft',
                          'Proactive Approach: Taking preventive security measures',
                          'Regular Updates: Staying informed about new threats'
                      ]
                  },
                  {
                      title: 'Password Security',
                      content: [
                          'Use complex passwords combining different character types',
                          'Implement a password manager for secure storage',
                          'Change passwords periodically',
                          'Avoid common, easily guessable passwords'
                      ]
                  },
                  {
                      title: 'Two-Factor Authentication (2FA)',
                      content: [
                          'Enable 2FA on all possible accounts',
                          'Use authenticator apps for enhanced security',
                          'Store recovery codes safely'
                      ]
                  },
                  {
                      title: 'Device Security',
                      content: [
                          'Keep software and systems updated',
                          'Use antivirus and anti-malware protection',
                          'Enable firewall protection',
                          'Implement device encryption',
                          'Use strong passcodes or biometric authentication'
                      ]
                  },
                  {
                      title: 'Online Safety',
                      content: [
                          'Be vigilant against phishing attempts',
                          'Use secure browsers with protection features',
                          'Verify website security (https)',
                          'Avoid sensitive transactions on public Wi-Fi',
                          'Consider VPN usage for privacy'
                      ]
                  }
              ],
              recommendations: [
                  'Regular data backups',
                  'Monitor credit reports',
                  'Secure home networks',
                  'Update smart home devices',
                  'Download from trusted sources only'
              ],
              tools: [
                  'Password Managers',
                  'Antivirus Software',
                  'VPN Services',
                  'Encryption Tools',
                  'Backup Solutions'
              ]
          }
      },

      {
        id: 'mobile-security-handbook',
        title: 'Mobile Security Handbook',
        description: 'Best practices for securing your mobile devices and apps.',
        fullContent: {
            title: 'Mobile Security Handbook: Essential Best Practices',
            introduction: 'Our phones are mini-computers holding a wealth of personal data. Keeping them secure is crucial.',
            sections: [
                {
                    title: 'Device Security Fundamentals',
                    points: [
                        'Strong Screen Lock: Use biometric or strong passcode',
                        'Software Updates: Regular OS and app updates',
                        'Antivirus/Anti-malware: Install security software',
                        'Find My Device: Enable device tracking features',
                        'Device Encryption: Protect data if device is lost'
                    ]
                },
                {
                    title: 'App Security',
                    points: [
                        'Download from Official Stores only',
                        'Review App Permissions carefully',
                        'Keep Apps Updated regularly',
                        'Uninstall Unused Apps'
                    ]
                },
                {
                    title: 'Network Security',
                    points: [
                        'Avoid sensitive activities on public Wi-Fi',
                        'Use VPN for encrypted connections',
                        'Turn off Bluetooth when not in use'
                    ]
                },
                {
                    title: 'Data Security',
                    points: [
                        'Regular data backups',
                        'Secure sensitive information storage',
                        'Careful information sharing',
                        'Factory reset before disposal'
                    ]
                }
            ],
            securityTools: [
                'Find My Device/Find My iPhone',
                'Mobile Antivirus Software',
                'VPN Services',
                'Password Managers',
                'Secure Backup Solutions'
            ],
            bestPractices: [
                'Enable two-factor authentication',
                'Regular security audits',
                'Be mindful of shoulder surfing',
                'Keep physical security in mind',
                'Stay informed about security threats'
            ]
        }
    },
    {
      id: 'scam-prevention-guide',
      title: 'Scam Prevention Guide',
      description: 'Learn to identify and avoid common cyber scams.',
      fullContent: {
          title: 'Scam Prevention Guide: Staying Safe in the Digital World',
          introduction: 'Cyber scams are increasingly sophisticated, but awareness is your best defense.',
          scamTypes: [
              {
                  name: 'Phishing',
                  description: 'Deceptive emails, texts, or calls pretending to be from legitimate organizations'
              },
              {
                  name: 'Smishing/Vishing',
                  description: 'Phishing via text message (smishing) or phone call (vishing)'
              },
              {
                  name: 'Advance Fee Scams',
                  description: 'Promises of large sums for small upfront fees'
              },
              {
                  name: 'Romance Scams',
                  description: 'Fake relationships to manipulate victims into sending money'
              },
              {
                  name: 'Tech Support Scams',
                  description: 'Impersonating tech support for access or payment'
              }
          ],
          redFlags: [
              'Unsolicited contact from unknown sources',
              'Urgent requests creating pressure',
              'Requests for personal information',
              'Offers that sound too good to be true',
              'Grammar and spelling errors',
              'Suspicious links or attachments',
              'Unusual payment method requests'
          ],
          protectionMeasures: [
              'Be skeptical of unexpected offers',
              'Verify sender identity through trusted channels',
              'Never share personal information',
              'Avoid clicking unknown links',
              'Use strong passwords and 2FA',
              'Keep software updated',
              'Report suspicious activity'
          ],
          responseSteps: [
              'Act quickly if compromised',
              'Contact financial institutions',
              'Change all passwords',
              'Report to authorities',
              'Monitor accounts for suspicious activity'
          ]
      }
  },
  ],

  videos: [
    {
        id: 'cybersecurity-basics',
        title: 'Cybersecurity Basics',
        description: 'Video series covering fundamental security practices.',
        fullContent: {
            title: 'Cybersecurity Basics Video Series',
            description: 'Learn essential cybersecurity practices through our comprehensive video series.',
            videoUrl: 'https://www.tiktok.com/embed/v2/7308653534591913222',
            duration: '03:00',
            chapters: [
                { title: 'Introduction to Cybersecurity', timestamp: '0:00' },
                { title: 'Password Security', timestamp: '01:30' },
                { title: 'Safe Browsing Habits', timestamp: '02:15' },
                { title: 'Malware Protection', timestamp: '03:00' }
            ],
            keyTakeaways: [
                'Understanding basic security principles',
                'Creating strong passwords',
                'Recognizing security threats',
                'Implementing protection measures'
            ]
        }
    },
    {
        id: 'scam-awareness',
        title: 'Scam Awareness',
        description: 'Visual guide to recognizing and avoiding cyber scams.',
        fullContent: {
            title: 'Scam Awareness Video Guide',
            description: 'Learn to identify and protect yourself from common cyber scams.',
            videoUrl: 'https://www.youtube.com/embed/2sNG9gd193o',
            duration: '8:46',
            chapters: [
                { title: 'Common Scam Types', timestamp: '0:00' },
                { title: 'Red Flags to Watch For', timestamp: '8:45' },
                { title: 'Prevention Strategies', timestamp: '17:30' },
                { title: 'Real-world Examples', timestamp: '25:15' }
            ],
            keyTakeaways: [
                'Identifying scam patterns',
                'Understanding social engineering tactics',
                'Protecting personal information',
                'Reporting scam attempts'
            ]
        }
    },
    {
        id: 'digital-safety-tutorial',
        title: 'Digital Safety Tutorial',
        description: 'Step-by-step guide to securing your online presence.',
        fullContent: {
            title: 'Digital Safety Tutorial Series',
            description: 'Comprehensive guide to protecting your digital life.',
            videoUrl: 'https://www.tiktok.com/embed/v2/7459849747835145477',
            duration: '03:00',
            chapters: [
                { title: 'Securing Your Devices', timestamp: '0:00' },
                { title: 'Social Media Privacy', timestamp: '01:30' },
                { title: 'Email Security', timestamp: '02:45' },
                { title: 'Safe Online Shopping', timestamp: '03:00' }
            ],
            keyTakeaways: [
                'Device security best practices',
                'Privacy settings configuration',
                'Safe online transactions',
                'Data protection strategies'
            ]
        }
    }
],

articles: [
    {
        id: 'latest-cyber-threats',
        title: 'Latest Cyber Threats',
        description: 'Stay informed about emerging cybersecurity threats.',
        fullContent: {
            title: 'Cyber Threats in 2025: Navigating New Risks and Strengthening Defenses',
            author: 'Cybersecurity Expert',
            publishDate: '2025',
            introduction: 'As we move further into 2025, the landscape of cyber threats continues to evolve, presenting new challenges for individuals and organizations alike.',
            sections: [
                {
                    title: 'Latest Cyber Threats in 2025',
                    content: [
                        'AI-Powered Cyber Attacks: Cybercriminals are increasingly using artificial intelligence to enhance the sophistication of their attacks.AI can automate vulnerability identification and craft convincing phishing schemes, making these attacks harder to detect.',
                        'Ransomware: Ransomware attacks are on the rise, with a significant increase in frequency and sophistication. These attacks can paralyze critical systems and demand substantial financial payouts, making them a top concern for IT professionals.',
                        'Deepfake Technology: The use of deepfake technology is becoming more prevalent. This can lead to misinformation and identity theft, complicating trust in digital communications.',
                        'Supply Chain Attacks: These attacks target software or hardware before they reach the consumer, exploiting trusted relationships. As organizations rely more on third-party vendors, the risk of supply chain attacks increases.',
                        'Social Engineering: Techniques such as phishing, vishing, and smishing continue to evolve, exploiting human psychology to gain unauthorized access to sensitive information.'
                    ]
                }
            ],
            tips: [
                'Invest in AI-Driven Security Solutions',
                'Regular Training and Awareness Programs',
                'Implement Multi-Factor Authentication (MFA)',
                'Conduct Regular Security Audits',
                'Backup Data Regularly'
            ],
            references: [
                {
                    title: 'Top Cybersecurity Threats 2025',
                    url: 'https://example.com/threats-2025'
                },
                {
                    title: 'Must-Know Cyberattack Statistics and Trends 2025',
                    url: 'https://example.com/stats-2025'
                },
                {
                    title: 'The Top 25 Security Predictions for 2025',
                    url: 'https://example.com/predictions-2025'
                }
            ]
        }
    },

    {
        id: 'security-best-practices',
        title: 'Security Best Practices',
        description: 'Expert recommendations for online safety.',
        fullContent: {
            title: 'Essential Security Best Practices for 2025: Safeguarding Against Evolving Threats',
            author: 'Security Expert',
            publishDate: '2025',
            introduction: 'As we progress through 2025, implementing robust security best practices is essential for organizations to protect their data and systems from evolving cyber threats. Here are some of the latest security best practices, along with references and tips for effective implementation.',
            sections: [
                {
                    title: 'Key Security Best Practices for 2025',
                    content: [
                        'Adopt a Zero Trust Security Model: o	The Zero Trust approach emphasizes "never trust, always verify." This means that every access request must be authenticated and authorized, regardless of whether the request comes from inside or outside the organization. This model helps mitigate risks associated with unauthorized access and insider threats.',
                        'Implement Multi-Factor Authentication (MFA): o	MFA adds an extra layer of security by requiring users to provide two or more verification factors to gain access to resources. This significantly reduces the risk of unauthorized access, especially in the face of credential theft.',
                        'Regularly Update and Patch Systems: o	Keeping software and systems up to date is crucial for protecting against known vulnerabilities. Regular patch management helps ensure that security flaws are addressed promptly, reducing the risk of exploitation by cybercriminals.',
                        'Conduct Regular Security Audits: o	Performing regular audits of security configurations and access controls can help identify vulnerabilities and ensure compliance with security policies. This proactive approach allows organizations to address potential weaknesses before they can be exploited.',
                        'Educate Employees on Security Awareness: o	Continuous training and awareness programs for employees are vital. Educating staff about the latest phishing techniques and social engineering tactics can significantly reduce the likelihood of successful attacks.',
                        'Implement the Principle of Least Privilege: o	This principle involves granting users the minimum level of access necessary to perform their job functions. Regularly reviewing and adjusting access permissions helps limit exposure to sensitive data and reduces the risk of insider threats.',
                        'Utilize Advanced Threat Detection Tools: o	Investing in AI-driven security solutions can enhance threat detection capabilities. These tools can analyze patterns and behaviors to identify potential threats in real-time, allowing for quicker responses to incidents.',
                        'Backup Data Regularly: o	Regular data backups are essential for recovery in the event of a ransomware attack or data loss incident. Ensuring that backups are stored securely and tested for integrity can help organizations recover quickly from disruptions.'
                    ]
                }
            ],
            bestPracticeDetails: [
                {
                    practice: 'Zero Trust Security',
                    description: 'Every access request must be authenticated and authorized, regardless of source.',
                    importance: 'Critical'
                },
                {
                    practice: 'Multi-Factor Authentication',
                    description: 'Requires two or more verification factors for access.',
                    importance: 'High'
                },
                {
                    practice: 'Regular Updates',
                    description: 'Addresses security flaws promptly to prevent exploitation.',
                    importance: 'High'
                }
            ],
            references: [
                {
                    title: 'The Top 25 Security Predictions for 2025',
                    url: 'https://example.com/security-predictions-2025'
                },
                {
                    title: '11 Identity & Access Management Best Practices in 2025',
                    url: 'https://example.com/iam-practices-2025'
                },
                {
                    title: '5 Cybersecurity Challenges Companies Must Navigate in 2025',
                    url: 'https://example.com/cyber-challenges-2025'
                }
            ]
        }
    },

    {
        id: 'digital-hygiene',
        title: 'Digital Hygiene',
        description: 'Essential habits for maintaining cyber security.',
        fullContent: {
            title: 'Digital Hygiene in 2025: Best Practices for a Secure Online Presence',
            author: 'Digital Security Expert',
            publishDate: '2025',
            introduction: 'As we navigate through 2025, maintaining good digital hygiene is more crucial than ever. Digital hygiene refers to the practices and precautions users take to protect their sensitive data and devices from cyber threats. Here are some of the latest digital hygiene tips and best practices to enhance your online security:',
            practices: [
                {
                    title: 'Strengthen Your Passwords',
                    details: [
                        'Use long, complex passwords or passphrases',
                        'Consider using a password manager',
                        'Enable two-factor authentication (2FA)'
                    ],
                    priority: 'Critical'
                },
                {
                    title: 'Keep Software Updated',
                    details: [
                        'Regularly update operating system',
                        'Keep applications current',
                        'Maintain antivirus software'
                    ],
                    priority: 'High'
                },
                {
                    title: 'Be Cautious on Public Wi-Fi',
                    details: [
                        'Avoid accessing sensitive information',
                        'Use a Virtual Private Network (VPN)',
                        'Verify network authenticity'
                    ],
                    priority: 'High'
                }
            ],
            familyGuidelines: [
                'Teach family members about online safety',
                'Encourage open discussions',
                'Monitor children\'s online activities',
                'Set clear boundaries for internet usage'
            ],
            references: [
                {
                    title: 'Cyber Hygiene Methodology for Healthcare Organizations',
                    url: 'https://example.com/cyber-hygiene-healthcare'
                },
                {
                    title: 'Essential Cyber Hygiene Tips for 2025',
                    url: 'https://example.com/cyber-hygiene-2025'
                },
                {
                    title: 'Digital Hygiene Tips from Cybersecurity Experts',
                    url: 'https://example.com/expert-tips'
                }
            ]
        }
    }
]


  };
  