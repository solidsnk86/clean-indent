# limpiar-indentacion

![npm](https://img.shields.io/npm/v/clean-indent?color=%2334D058&style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/clean-indent?style=for-the-badge)
![npm](https://img.shields.io/npm/dw/clean-indent?style=for-the-badge)

## Descripción

**limpiar-indentacion** es una utilidad ligera y eficiente para limpiar las indentaciones de cadenas de código. Ideal para formatear textos y asegurarte de que no queden espacios innecesarios al inicio o al final de cada línea.

## Características

- **Fácil de usar**: Simplemente pasa la cadena que quieres limpiar.
- **Ligera**: Sin dependencias adicionales.
- **Rápida**: Procesa incluso cadenas grandes rápidamente.
- **Compatibilidad**: Funciona con Node.js y navegadores.
- **Diseñada**: Esta utilidad está principalmente para formato de código y mostrar un ejemplo dentro de un elemento `<pre>` y limpiar las indentaciones y formatear el código.

## Instalación

Puedes instalar este paquete usando npm o yarn:

### npm

```sh
npm install clean-indent
```

O también puedes usar

```sh
pnpm install cleant-indent
```

### Ejemplo de uso

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
