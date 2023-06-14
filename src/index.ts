import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { NotebookPanel } from '@jupyterlab/notebook';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import { requestAPI } from './handler';

import { CounterWidget } from './widget';

import { PasteDetector } from './pasteDetector';

import { LibDetector } from './libDetector';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const create = 'create-react-widget';
}

/**
 * Initialization data for the srs-jupyterlab-extension extension.
 */
const pluginServer: JupyterFrontEndPlugin<void> = {
  id: 'srs-jupyterlab-extension:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension srs-jupyterlab-extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(pluginServer.id)
        .then(settings => {
          console.log('srs-jupyterlab-extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for srs-jupyterlab-extension.', reason);
        });
    }

    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The srs_jupyterlab_extension server extension appears to be missing.\n${reason}`
        );
      });
  }
};

/**
 * Initialization data for the react-widget extension.
 */
const pluginWidget: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: 'Create a new React Widget',
      label: 'React Widget',
      // @ts-ignore
      icon: (args) => (args['isPalette'] ? null : reactIcon),
      execute: () => {
        const content = new CounterWidget();
        const widget = new MainAreaWidget<CounterWidget>({ content });
        widget.title.label = 'React Widget';
        widget.title.icon = reactIcon;
        app.shell.add(widget, 'main');
      },
    });

    if (launcher) {
      launcher.add({
        command,
      });
    }
  },
};

const pluginPasteDetector: JupyterFrontEndPlugin<void> = {
  id: 'paste-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('paste-detector:open', {
      label: 'Paste Detector',
      execute: () => {

        const pasteDetector = new PasteDetector();
        document.addEventListener('paste', (event) => {
          // @ts-ignore
          const clipboardData = event.clipboardData.getData('text/plain');
          if (clipboardData) {
            // Access the clipboard data here
            console.log('Clipboard data:', clipboardData);
          }
          pasteDetector.detectPaste();
        });

    }});

    app.contextMenu.addItem({
      command: 'paste-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });

  }
}

const pluginLibraryDetector: JupyterFrontEndPlugin<void> = {
  id: 'library-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('library-detector:open', {
      label: 'Library Detector',
      execute: () => {
        console.log('Library Detector activated!');
        const panel = app.shell.currentWidget as NotebookPanel;
        const libDetector = new LibDetector(panel);
        libDetector.detectLib();
    }});

    app.contextMenu.addItem({
      command: 'library-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });}

}

export default [pluginServer, pluginWidget, pluginPasteDetector, pluginLibraryDetector];
