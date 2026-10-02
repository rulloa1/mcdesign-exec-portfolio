import re

out_file = r'C:\Users\roryulloa\.gemini\antigravity-ide\scratch\mcdesign-portfolio\index.html'
with open(out_file, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('"/__l5e/assets-v1/', '"https://mcdesign.bio/__l5e/assets-v1/')

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(html)
