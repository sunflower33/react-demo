import {
  CompositePanel,
  Designer,
  StudioPanel,
  ResourceWidget,
  OutlineTreeWidget,
  HistoryWidget,
  WorkspacePanel,
  ToolbarPanel,
  ViewToolsWidget,
  DesignerToolsWidget,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
} from "@designable/react";
import {
  MonacoInput,
  SettingsForm,
  setNpmCDNRegistry,
} from "@designable/react-settings-form";
import { createDesigner, KeyCode, Shortcut } from "@designable/core";

import { observer } from "@formily/react";

import { Button, Card, Rate, Space } from "antd";
import { useEffect, useMemo } from "react";
import "./App.css";
import Content from "./components/content/Content";
import { Input } from "@formily/antd";
import "./config/locales";
import LogoWidget from "./components/LogoWidget";
import ActionsWidget from "./components/ActionsWidget";

setNpmCDNRegistry("//unpkg.com");

export default function App() {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              console.log(ctx);
              // saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: "Form",
      }),
    []
  );
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={[Input]} />
            
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <WorkspacePanel>
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget />{" "}
          </ToolbarPanel>
          <ViewportPanel>
            {/* <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel> */}
            <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
            <ViewPanel type="JSONTREE">
              {() => {
                return (
                  <div style={{ overflow: "hidden", height: "100%" }}>
                    <MonacoInput
                      language="javascript"
                      helpCode="//hello world"
                      defaultValue={`<div><div>123123<div>123123<div>123123<div>123123</div></div></div></div></div>`}
                    />
                  </div>
                );
              }}
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
}
