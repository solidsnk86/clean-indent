# Clean Indent

![npm](https://img.shields.io/npm/v/clean-indent?color=%2334D058&style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/clean-indent?style=for-the-badge)
![npm](https://img.shields.io/npm/dw/clean-indent?style=for-the-badge)

## Descripción

**clean-indent** es una utilidad ligera y eficiente para limpiar las indentaciones de cadenas de código. Ideal para formatear textos y asegurarte de que no queden espacios innecesarios al inicio o al final de cada línea. Ideal para presentaciones de código dentro de los elementos `<pre>`.

## Características

- **Fácil de usar**: Simplemente pasa la cadena que quieres limpiar.
- **Ligera**: Sin dependencias adicionales.
- **Rápida**: Procesa incluso cadenas grandes rápidamente.
- **Compatibilidad**: Funciona con Node.js y navegadores.
- **Especializada**: Esta utilidad está principalmente diseñada para preparar fragmentos de código para su presentación en el renderizado del HTML `<pre>`, para limpiar las indentaciones y formatear el código.

## Instalación

Puedes instalar este paquete usando npm, pnpm o yarn:

### npm

```sh
npm install clean-indent
```

### pnpm

```sh
pnpm install clean-indent
```

### yarn

```sh
yarn install clean-indent
```

- Si no quieres instalar el paquete puedes usar el cdn:
```javascript
import cleanIndent from 'https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/clean-indent.js';

const code = document.querySelector('pre > code');
code.innerText = cleanIndent(code)
```

### Ejemplo de uso

- Componente:

```typescript
import cleanIndent from 'clean-indent';

export const Pre = (lang: string, stringCode: string) => {
  return (
    <pre lang={lang}>
      {cleanIndent(stringCode)}
    </pre>
  );
};
```

- Uso estándar del componente:

```typescript
import { Pre } from '@/components/Pre';

export default function Page() {
  return (
    <main>
      <Pre lang="typescript">
        {`
          async function getData() {
            const url = 'https://solid-geolocation.vercel.app/location';
            const response = await fetch(url);
            const jsonData = await response.json();
            return jsonData;
          }
        `}
      </Pre>
    </main>
  );
}
```

### Aquí les dejo este componente que he creado en React más completo con otras dependencias:

Instalamos las dependencias.

```sh
pnpm install prism-react-renderer lucide-react clean-indent
```

```tsx
import { useMemo, useRef, useState } from 'react';
import styles from './pre.module.css';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, CopyCheck } from 'lucide-react';
import cleanIndent from 'clean-indent';

interface PreProps {
  stringCode: string;
  lang: string;
}

export const Pre = ({ stringCode, lang }: PreProps) => {
  const code = useMemo(() => stringCode, [stringCode]);
  const content = useRef<HTMLPreElement>();
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!content.current) return;

    try {
      await navigator.clipboard.writeText(content.current.textContent || '');
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar en el portapapeles:', err);
    }
  };

  return (
    <Highlight code={code} theme={themes.oneDark} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={styles.custom_pre} ref={content as any}>
          <span className={styles.icon} onClick={copyCode}>
            {copied ? (
              <CopyCheck width={16} height={16} className={styles.copied} />
            ) : (
              <Copy className="cursor-pointer" width={16} height={16} />
            )}
          </span>
          {tokens.map((line, lineIndex) => (
            <code {...getLineProps({ line })} key={lineIndex + 1}>
              <span className={styles.line_number} key={lineIndex}>
                {lineIndex}
              </span>
              {line.map((token, tokenIndex) => (
                <span
                  key={tokenIndex}
                  {...getTokenProps({ token })}
                  className={styles.line_content}
                />
              ))}
            </code>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
```

- Uso del componente:

```tsx
import { Pre } from '@/components/Pre'

export default function Page() {
  return (
    <Pre
        lang="typescript"
        stringCode={`
        export default async function getApiData({ user }: { user: string }) {
            const response = await fetch('https://calcagni-gabriel/api/non-followers?user=\${user}');
            const data = await response.json();
            return data;
        }
      `}
    />
  )
}
```

- Estilos del componente:

```css
.custom_pre {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 16px 16px 16px 8px;
  border-radius: 0 0 10px 10px;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  background-color: #222;
  font-family: 'Cascadia Code PL';
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
}

.line_number {
  user-select: none;
  width: 1em;
  font-weight: 300;
  user-select: none;
  opacity: 0.5;
  text-align: right;
  margin-right: 1.3em;
}

.line_content {
  color: #ddd;
  flex: 1;
}

.lang_container {
  background-color: #04090b;
  width: 100%;
  padding-inline: 12px;
  border-top: 1px solid #333;
  border-right: 1px solid #333;
  border-left: 1px solid #333;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.lang {
  width: fit-content;
  color: #ec4899;
  text-transform: capitalize;
  background-color: #222;
  padding: 6px 16px;
  transform: translateX(-15px);
  z-index: 99;
}

.icon {
  position: absolute;
  top: -26px;
  right: 12px;
  color: #888;
  transition: opacity 0.6s ease-in-out;
  cursor: pointer;
}

.icon:hover {
  filter: drop-shadow(0 0 6px #2f9);
}

.custom_pre:hover .icon {
  opacity: 1;
}

.copied {
  animation-name: insideOut;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;
  text-rendering: optimizeLegibility;
}

@keyframes insideOut {
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  50% {
    transform: rotateY(30deg);
    opacity: 0.5;
  }
  100% {
    transform: rotateY(0);
    opacity: 1;
  }
}

```

### Imagen del componente

<div>
  <Img src="public/screen-shot-PRE.png" width="100%" height="auto" alt="Screen-shot PRE" />
</div>

---

<div align="center">
solidsnk86 • 2025
</div>
