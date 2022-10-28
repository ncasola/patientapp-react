module.exports = function (plop) {
    plop.setHelper('upperCase', function (text) {
        return text.toUpperCase();
    });
    // make a page generator which will create three files in the pages directory
    plop.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page name?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/_pages/_{{name}}/{{pascalCase name}}.jsx',
                templateFile: 'plop-templates/actions/page.hbs',
            },
            {
                type: 'add',
                path: 'src/_pages/_{{name}}/{{pascalCase name}}Routes.jsx',
                templateFile: 'plop-templates/actions/pageRoutes.hbs',
            },
            {
                type: 'add',
                path: 'src/_pages/_{{name}}/index.jsx',
                templateFile: 'plop-templates/actions/pageIndex.hbs',
            },
            {
                type: 'append',	
                path: 'src/App.jsx',
                pattern: '/* PLOP_INJECT_IMPORT */',
                template: 'import {{pascalCase name}}Routes from \'./_pages/_{{ name }}/{{pascalCase name}}Routes\';',
            },
            {
                type: 'append',
                path: 'src/App.jsx',
                pattern: '/* PLOP_INJECT_ROUTE */',
                template: '{ {{pascalCase name}}Routes }',
            }
        ],
    });
};