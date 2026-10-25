import sys

for m in ['fitz', 'pypdf', 'PyPDF2', 'pdf2image']:
    try:
        __import__(m)
        print(f'{m}: available')
    except ImportError:
        print(f'{m}: not available')
