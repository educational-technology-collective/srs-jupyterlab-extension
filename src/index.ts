import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the srs-jupyterlab-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'srs-jupyterlab-extension:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension srs-jupyterlab-extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
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

export default plugin;
