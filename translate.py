import json
import os
import time
from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='zh-CN', target='en')

def translate_text(text):
    if not text: return text
    try:
        time.sleep(0.3)
        res = translator.translate(text)
        return res
    except Exception as e:
        print(f"Error translating '{text}': {e}")
        time.sleep(2)
        try:
            return translator.translate(text)
        except:
            return text

def translate_dict(d):
    if isinstance(d, dict):
        new_d = {}
        for k, v in d.items():
            if k in ['text', 'label', 'cn', 'intro', 'desc', 'name', 'funNote', 'funNoteSpecial', 'title', 'subtitle', 'author', 'L', 'M', 'H']:
                if isinstance(v, str):
                    print(f"Translating: {v[:20]}...")
                    new_d[k] = translate_text(v)
                elif isinstance(v, dict):
                    new_d[k] = translate_dict(v)
                else:
                    new_d[k] = v
            else:
                new_d[k] = translate_dict(v)
        return new_d
    elif isinstance(d, list):
        return [translate_dict(i) for i in d]
    else:
        return d

os.makedirs('data/en', exist_ok=True)
os.makedirs('data/zh', exist_ok=True)

files = ['questions.json', 'types.json', 'dimensions.json', 'config.json']

for f in files:
    print(f"Processing {f}...")
    with open(f'data/{f}', 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Save original to zh/
    with open(f'data/zh/{f}', 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
    
    en_data = translate_dict(data)
    
    with open(f'data/en/{f}', 'w', encoding='utf-8') as file:
        json.dump(en_data, file, ensure_ascii=False, indent=2)

print("Done!")
