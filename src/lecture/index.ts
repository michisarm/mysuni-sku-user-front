
export * from './shared';

declare global {
    interface Window {
        EmbedApi: any;
    }
}
  
window.EmbedApi = window.EmbedApi || "EmbedApi";

export { default as ChannelLecturesLine } from './recommend/ui/logic/ChannelLecturesLineContainer';

