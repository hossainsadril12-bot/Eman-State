"""
Script to apply Vivre-style animations to all sections of App.tsx.
"""
import sys

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

changes = []

def replace_once(old, new, label):
    global content
    if old in content:
        content = content.replace(old, new, 1)
        changes.append("OK: " + label)
    else:
        changes.append("MISS: " + label)

# 1. ABOUT section left column
replace_once(
    '<motion.div\n              initial={{ opacity: 0, y: 30 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: true, margin: "-100px" }}\n              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}\n              className="space-y-10 max-w-[600px]"\n            >',
    '<div className="space-y-10 max-w-[600px]">',
    'About left: motion.div open -> plain div'
)

replace_once(
    '<p className="text-mist text-[10px] tracking-[0.4em] uppercase font-bold">\n                  ABOUT THE PROJECT\n                </p>',
    '<FadeUp className="text-mist text-[10px] tracking-[0.4em] uppercase font-bold">\n                  ABOUT THE PROJECT\n                </FadeUp>',
    'About: label FadeUp'
)

replace_once(
    '<h2 className="text-4xl lg:text-7xl text-estate-navy tracking-tight leading-[1.1]">\n                   About <br/>\n                  <span className="italic text-warm-gold">Velora Inani</span>\n                </h2>',
    '<h2 className="text-4xl lg:text-7xl text-estate-navy tracking-tight leading-[1.1]">\n                  <SplitText>About </SplitText>\n                  <SplitText className="italic text-warm-gold" delay={0.08}>Velora Inani</SplitText>\n                </h2>',
    'About: heading SplitText'
)

replace_once(
    '<p className="text-slate text-xl leading-relaxed font-light">\n                  Velora Inani is a fully managed hotel development set along a quiet, elevated stretch of Inani\'s coastline where the hills meet the sea \u2014 away from the congestion of the main tourist corridor.\n                </p>',
    '<FadeUp delay={0.1} className="text-slate text-xl leading-relaxed font-light">\n                  Velora Inani is a fully managed hotel development set along a quiet, elevated stretch of Inani\'s coastline where the hills meet the sea \u2014 away from the congestion of the main tourist corridor.\n                </FadeUp>',
    'About: body p1 FadeUp'
)

replace_once(
    '<p className="text-warm-gold text-lg font-serif italic border-l-2 border-warm-gold/30 pl-8">\n                  A beachfront asset on Marine Drive, Cox\'s Bazar, designed for long-term ownership. A limited number of units are being offered in this first phase.\n                </p>',
    '<FadeUp delay={0.18} className="text-warm-gold text-lg font-serif italic border-l-2 border-warm-gold/30 pl-8">\n                  A beachfront asset on Marine Drive, Cox\'s Bazar, designed for long-term ownership. A limited number of units are being offered in this first phase.\n                </FadeUp>',
    'About: body p2 FadeUp'
)

# The closing div of motion.div in About left (unique enough via the Button inside)
replace_once(
    '<div className="pt-8">\n                <Button variant="secondary">The Vision Dossier</Button>\n              </div>\n            </motion.div>',
    '<FadeUp delay={0.32} className="pt-8">\n                <Button variant="secondary">The Vision Dossier</Button>\n              </FadeUp>\n            </div>',
    'About: button FadeUp + close div'
)

# 2. BOSUNIA portrait column
replace_once(
    '<motion.div \n              initial={{ opacity: 0, x: -30 }}\n              whileInView={{ opacity: 1, x: 0 }}\n              viewport={{ once: true }}\n              className="lg:col-span-5 relative"\n            >',
    '<FadeIn className="lg:col-span-5 relative">',
    'Bosunia: portrait FadeIn open'
)

replace_once(
    '</motion.div>\n\n            {/* Content Column */}\n            <motion.div \n              initial={{ opacity: 0, x: 30 }}\n              whileInView={{ opacity: 1, x: 0 }}\n              viewport={{ once: true }}\n              className="lg:col-span-7 space-y-10"\n            >',
    '</FadeIn>\n\n            {/* Content Column */}\n            <div className="lg:col-span-7 space-y-10">',
    'Bosunia: portrait FadeIn close + content div open'
)

replace_once(
    '<p className="text-estate-navy text-[10px] tracking-[0.4em] uppercase font-bold opacity-80">\n                    STRUCTURAL ADVISORY IS LED BY\n                  </p>\n                  <div className="w-16 h-[2px] bg-warm-gold" />',
    '<FadeUp className="text-estate-navy text-[10px] tracking-[0.4em] uppercase font-bold opacity-80">\n                    STRUCTURAL ADVISORY IS LED BY\n                  </FadeUp>\n                  <AnimatedLine className="w-16" delay={0.2} />',
    'Bosunia: label + line animated'
)

replace_once(
    '<h2 className="text-4xl lg:text-5xl text-estate-navy font-serif leading-tight">\n                  Prof. Dr. M <br />\n                  <span className="italic">Shamim Z Bosunia</span>\n                </h2>',
    '<h2 className="text-4xl lg:text-5xl text-estate-navy font-serif leading-tight">\n                  <SplitText>Prof. Dr. M </SplitText>\n                  <SplitText className="italic" delay={0.1}>Shamim Z Bosunia</SplitText>\n                </h2>',
    'Bosunia: heading SplitText'
)

replace_once(
    '<p className="text-slate text-lg leading-relaxed max-w-2xl font-light">\n                  A distinguished leader in the field of civil engineering, whose vision and expertise continue to shape some of the nation\'s most iconic infrastructure projects.\n                </p>',
    '<FadeUp delay={0.15} className="text-slate text-lg leading-relaxed max-w-2xl font-light">\n                  A distinguished leader in the field of civil engineering, whose vision and expertise continue to shape some of the nation\'s most iconic infrastructure projects.\n                </FadeUp>',
    'Bosunia: body text FadeUp'
)

# Close Bosunia content column (the last motion.div before Breather section)
replace_once(
    '            </motion.div>\n          </div>\n        </section>\n\n        {/* BREATHER',
    '            </div>\n          </div>\n        </section>\n\n        {/* BREATHER',
    'Bosunia: content column close div'
)

# 3. OWNERSHIP MODEL - header
replace_once(
    '<span className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold">4A \u2014 The Asset</span>',
    '<FadeUp className="text-warm-gold text-[10px] tracking-[0.4em] uppercase font-bold">4A \u2014 The Asset</FadeUp>',
    'Ownership: label FadeUp'
)

replace_once(
    '<h2 className="text-4xl lg:text-8xl text-estate-navy tracking-tighter leading-[0.9]">\n                What You <br />\n                <span className="italic text-warm-gold">Own.</span>\n              </h2>',
    '<h2 className="text-4xl lg:text-8xl text-estate-navy tracking-tighter leading-[0.9]">\n                <SplitText>What You </SplitText>\n                <SplitText className="italic text-warm-gold" delay={0.1}>Own.</SplitText>\n              </h2>',
    'Ownership: heading SplitText'
)

# Wrap cards grid with stagger container
replace_once(
    '<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">\n                {[',
    '<motion.div\n                className="grid grid-cols-1 lg:grid-cols-3 gap-8"\n                variants={staggerContainerVariants}\n                initial="hidden"\n                whileInView="visible"\n                viewport={{ once: true, margin: "-60px" }}\n              >\n                {[',
    'Ownership: cards stagger container'
)

replace_once(
    '<motion.div \n                    key={item.title}\n                    initial={{ opacity: 0, y: 40 }}\n                    whileInView={{ opacity: 1, y: 0 }}\n                    transition={{ delay: idx * 0.15, duration: 1 }}\n                    viewport={{ once: true }}\n                    className="flex flex-col h-full bg-[#FBF9F6] border border-stone/20 p-10 lg:p-12 hover:border-warm-gold transition-all duration-700 hover:shadow-2xl hover:shadow-warm-gold/5 group"\n                  >',
    '<motion.div \n                    key={item.title}\n                    variants={staggerItemVariants}\n                    className="flex flex-col h-full bg-[#FBF9F6] border border-stone/20 p-10 lg:p-12 hover:border-warm-gold transition-all duration-700 hover:shadow-2xl hover:shadow-warm-gold/5 group"\n                  >',
    'Ownership: card stagger item'
)

replace_once(
    '              </div>\n\n              {/* Closing statement block */}',
    '              </motion.div>\n\n              {/* Closing statement block */}',
    'Ownership: close stagger container'
)

# 4. EQUITY section heading
replace_once(
    '<span className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold block">The Equity Model</span>\n                  <h2 className="text-5xl md:text-8xl text-white tracking-tighter leading-[0.9] font-serif">\n                    Ownership <br />\n                    <span className="italic">You Can Share</span>\n                  </h2>',
    '<FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold block">The Equity Model</FadeUp>\n                  <h2 className="text-5xl md:text-8xl text-white tracking-tighter leading-[0.9] font-serif">\n                    <SplitText>Ownership </SplitText>\n                    <SplitText className="italic" delay={0.08}>You Can Share</SplitText>\n                  </h2>',
    'Equity: heading animated'
)

# 5. ABOUT EIMAN ESTATES heading
replace_once(
    '<span className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">About Eiman Estates</span>\n                  <h2 className="text-4xl lg:text-6xl text-estate-navy tracking-tight leading-[1.1] font-serif">\n                    Built To The Same Standard <br />\n                    <span className="italic">It Is Managed.</span>\n                  </h2>',
    '<FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">About Eiman Estates</FadeUp>\n                  <h2 className="text-4xl lg:text-6xl text-estate-navy tracking-tight leading-[1.1] font-serif">\n                    <SplitText>Built To The Same Standard </SplitText>\n                    <SplitText className="italic" delay={0.08}>It Is Managed.</SplitText>\n                  </h2>',
    'Eiman Estates: heading animated'
)

# 6. FAQ heading
replace_once(
    '<span className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Frequently Asked Questions</span>\n                <h2 className="text-4xl md:text-5xl text-estate-navy tracking-tight leading-none font-serif">\n                  Clear, <br />\n                  <span className="italic text-warm-gold">transparent</span> answers.\n                </h2>\n                <p className="text-mist text-lg leading-relaxed pt-6">\n                  We believe absolute clarity is the foundation of trust. Explore the essential details of ownership and operation.\n                </p>\n                <div className="pt-8 hidden lg:block">\n                  <div className="w-24 h-[1px] bg-warm-gold/30" />\n                </div>',
    '<FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Frequently Asked Questions</FadeUp>\n                <h2 className="text-4xl md:text-5xl text-estate-navy tracking-tight leading-none font-serif">\n                  <SplitText>Clear, </SplitText>\n                  <SplitText className="italic text-warm-gold" delay={0.06}>transparent</SplitText>\n                  <SplitText delay={0.12}> answers.</SplitText>\n                </h2>\n                <FadeUp delay={0.15} className="text-mist text-lg leading-relaxed pt-6">\n                  We believe absolute clarity is the foundation of trust. Explore the essential details of ownership and operation.\n                </FadeUp>\n                <div className="pt-8 hidden lg:block">\n                  <AnimatedLine className="w-24 opacity-30" delay={0.2} />\n                </div>',
    'FAQ: heading + desc + line animated'
)

# 7. CONTACT heading
replace_once(
    '<span className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Contact</span>\n                <h2 className="text-4xl md:text-6xl text-estate-navy tracking-tight leading-none font-serif">\n                  A Considered <br />\n                  <span className="italic text-warm-gold">Entry.</span>\n                </h2>',
    '<FadeUp className="text-warm-gold text-[10px] tracking-[0.5em] uppercase font-bold">Contact</FadeUp>\n                <h2 className="text-4xl md:text-6xl text-estate-navy tracking-tight leading-none font-serif">\n                  <SplitText>A Considered </SplitText>\n                  <SplitText className="italic text-warm-gold" delay={0.08}>Entry.</SplitText>\n                </h2>',
    'Contact: heading animated'
)

replace_once(
    '<p className="text-slate text-lg max-w-2xl mx-auto leading-relaxed">\n                When you\'re ready to learn more, we\'re ready to walk you through everything \u2014 clearly and at your pace.\n              </p>',
    '<FadeUp delay={0.1} className="text-slate text-lg max-w-2xl mx-auto leading-relaxed">\n                When you\'re ready to learn more, we\'re ready to walk you through everything \u2014 clearly and at your pace.\n              </FadeUp>',
    'Contact: sub text FadeUp'
)

# Animate the contact form card
replace_once(
    '<div className="bg-white p-12 lg:p-16 shadow-2xl relative z-10 border border-stone/10">',
    '<FadeIn delay={0.2}>',
    'Contact: form FadeIn open'
)

replace_once(
    '</div>\n\n              {/* Address Information */}',
    '</FadeIn>\n\n              {/* Address Information */}',
    'Contact: form FadeIn close'
)

# Write the updated file
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nResults:")
for c in changes:
    print(" ", c)
print("\nDone!")
