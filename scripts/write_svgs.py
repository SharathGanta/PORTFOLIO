import os

svgs = {
    'automationanywhere.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 20h4.5l2-4h7l2 4H22L12 2zm0 6.5l2.4 4.5H9.6L12 8.5z" fill="#FF6A00"/>
  <circle cx="12" cy="15" r="1.8" fill="#001C38"/>
</svg>''',

    'powerautomate.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#0066FF" d="M4 4h7.5c2.5 0 4.5 2 4.5 4.5S14 13 11.5 13H8v7H4V4z"/>
  <path fill="#002B7A" opacity="0.6" d="M8 9h3.5c.8 0 1.5-.7 1.5-1.5S12.3 6 11.5 6H8v3z"/>
  <path fill="#3399FF" d="M13 11l7 5-7 5v-10z"/>
</svg>''',

    'blueprism.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#002D72" d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm0 3.2l6.5 3.8-6.5 3.8-6.5-3.8L12 5.2zm-7 5.7l6 3.5v7l-6-3.5v-7zm8 10.5v-7l6-3.5v7l-6 3.5z"/>
</svg>''',

    'celonis.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="#22262B"/>
  <circle cx="12" cy="12" r="5.5" fill="#40E0D0"/>
  <path d="M12 2a10 10 0 0 1 10 10h-4.5a5.5 5.5 0 0 0-5.5-5.5V2z" fill="#00F2FE"/>
</svg>''',

    'powerbi.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect x="3" y="11" width="4" height="10" rx="1" fill="#F2C811"/>
  <rect x="10" y="6" width="4" height="15" rx="1" fill="#E6AD10"/>
  <rect x="17" y="2" width="4" height="19" rx="1" fill="#C98A0C"/>
</svg>''',

    'autogen.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#0078D4" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2L18.5 8 12 11.5 5.5 8 12 5.2zm-7 4.7l6 3.4v6.8l-6-3.3V9.9zm8 10.2v-6.8l6-3.4v6.9l-6 3.3z"/>
  <circle cx="12" cy="12" r="2.5" fill="#50E6FF"/>
</svg>''',

    'workfusion.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="9.5" fill="#1B2A4A"/>
  <path d="M7 8h10l-5 8L7 8z" fill="#00B4D8"/>
</svg>'''
}

os.makedirs('public/logos', exist_ok=True)
for fname, content in svgs.items():
    with open(os.path.join('public/logos', fname), 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f'Wrote {fname}')
