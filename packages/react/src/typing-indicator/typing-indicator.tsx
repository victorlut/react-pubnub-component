import React, { FC } from "react";
import { CommonTypingIndicatorProps, useTypingIndicatorCore } from "@pubnub/common-chat-components";
import "./typing-indicator.scss";

export type TypingIndicatorProps = CommonTypingIndicatorProps;

/** Subscribes to events generated by MessageInput to display information about users that are
 * currently typing messages.
 *
 * It can be displayed as a text denoting the user's name, or in a form similar to
 * a message that can be renderer inside MessageList.
 */
export const TypingIndicator: FC<TypingIndicatorProps> = (props: TypingIndicatorProps) => {
  const { activeUUIDs, getIndicationString, theme, users } = useTypingIndicatorCore(props);

  const renderUserBubble = (uuid) => {
    const user = users.find((u) => u.id === uuid);

    return (
      <div className="pn-msg" key={uuid}>
        <div className="pn-msg__avatar">
          {user?.profileUrl && <img src={user.profileUrl} alt="User avatar" />}
          {!user?.profileUrl && <div className="pn-msg__avatar-placeholder" />}
        </div>

        <div className="pn-msg__main">
          <div className="pn-msg__title">
            <span className="pn-msg__author">{user?.name || "Unknown User"}</span>
          </div>
          <div className="pn-msg__bubble">
            <span className="pn-typing-indicator-dot">●</span>
            <span className="pn-typing-indicator-dot">●</span>
            <span className="pn-typing-indicator-dot">●</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!props.showAsMessage && !!activeUUIDs.length && (
        <div className={`pn-typing-indicator pn-typing-indicator--${theme}`}>
          {getIndicationString()}&nbsp;
        </div>
      )}
      {props.showAsMessage && activeUUIDs.map((uuid) => renderUserBubble(uuid))}
    </>
  );
};

TypingIndicator.defaultProps = {
  showAsMessage: false,
};
