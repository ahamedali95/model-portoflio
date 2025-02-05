interface ImportMeta {
    'process.env': {
        APP_VERSION: string;
        APP_ENV: string;
    };
}

declare module '*.module.css' {
    const classes: {
        [key: string]: string;
    };
    export default classes;
}

declare module '*.svg' {
    const content: any;
    export default content;
}