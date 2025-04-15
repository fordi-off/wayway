import os
import pyperclip

IGNORE_FOLDERS = {'.git', '__pycache__', 'node_modules'}

FILE_ICONS = {
    '.html': '🌐',
    '.js': '📜',
    '.css': '🎨',
    '.json': '🧾',
    '.md': '📝',
    '.py': '🐍',
    '.txt': '📄',
    '.jpg': '🖼️',
    '.jpeg': '🖼️',
    '.png': '🖼️',
    '.gif': '🖼️',
    '.xml': '📜',
    '.csv': '📊',
    '.pdf': '📑',
    '.zip': '📦',
    '.tar': '📦',
    '.mp4': '🎥',
    '.mp3': '🎵',
}

FOLDER_ICON = '📁'

def format_size(bytes):
    kb = bytes / 1024
    return f"{kb:.1f} KB" if kb >= 0.1 else f"{bytes} B"

def get_icon(file, is_dir):
    if is_dir:
        return FOLDER_ICON
    _, ext = os.path.splitext(file)
    return FILE_ICONS.get(ext.lower(), '📄')

def generate_tree(path='.', prefix=''):
    entries = sorted([
        e for e in os.listdir(path)
        if e not in IGNORE_FOLDERS
    ], key=lambda x: (not os.path.isdir(os.path.join(path, x)), x.lower()))

    lines = []
    total = len(entries)

    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        is_dir = os.path.isdir(full_path)
        is_last = index == total - 1
        connector = '└──' if is_last else '├──'
        icon = get_icon(entry, is_dir)

        if is_dir:
            lines.append(f"{prefix}{connector} {icon} {entry}")
            extension = '    ' if is_last else '│   '
            lines.extend(generate_tree(full_path, prefix + extension))
        else:
            size = format_size(os.path.getsize(full_path))
            lines.append(f"{prefix}{connector} {icon} {entry} ({size})")

    return lines

def main():
    tree_lines = generate_tree()
    output = "## 📁 Project Structure\n\n```\n" + "\n".join(tree_lines) + "\n```\n"

    print(output)
    try:
        pyperclip.copy(output)
        print("📋 Copied to clipboard!")
    except Exception:
        print("⚠️ Clipboard copy failed (pyperclip not available or unsupported).")

if __name__ == '__main__':
    main()
