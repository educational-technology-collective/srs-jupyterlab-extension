import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the spaced-repetition-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'spaced-repetition-extension:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension spaced-repetition-extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('spaced-repetition-extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for spaced-repetition-extension.', reason);
        });
    }

    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The spaced_repetition_extension server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
