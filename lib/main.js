'use babel';

import AdriansTerminalView from './adrians-terminal-view';
import { CompositeDisposable } from 'atom';

export default {

  adriansTerminalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.adriansTerminalView = new AdriansTerminalView(state.adriansTerminalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.adriansTerminalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'adrians-terminal:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.adriansTerminalView.destroy();
  },

  serialize() {
    return {
      adriansTerminalViewState: this.adriansTerminalView.serialize()
    };
  },

  toggle() {
    console.log('AdriansTerminal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
