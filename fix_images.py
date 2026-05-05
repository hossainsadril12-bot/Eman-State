with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The FadeIn wrappers inside about images need w-full h-full to fill parent containers
content = content.replace('<FadeIn>\n                  <img \n                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e', '<FadeIn className="w-full h-full">\n                  <img \n                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 1)

content = content.replace('<FadeIn delay={0.1}>\n                  <img \n                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5', '<FadeIn delay={0.1} className="w-full h-full">\n                  <img \n                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5', 1)

content = content.replace('<FadeIn delay={0.2}>\n                  <img \n                    src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7', '<FadeIn delay={0.2} className="w-full h-full">\n                  <img \n                    src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7', 1)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
