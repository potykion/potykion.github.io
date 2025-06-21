// src/remark-plugins/remark-autolink-bare-urls.mjs
import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';

export function remarkAutolinkBareUrls() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const text = node.value;
      const newChildren = [];
      let lastIndex = 0;

      // Regular expression for bare URLs (from previous version)
      const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*(?:\/[^\s]*)?)/g;

      // Regular expression for @mentions
      // It captures the username part (e.g., "shedevrum_aibot")
      const mentionRegex = /@([a-zA-Z0-9_]+)/g;

      // Combine matches from both regexes and process them in order
      const allMatches = [];

      // Add URL matches
      for (const match of text.matchAll(urlRegex)) {
        allMatches.push({
          type: 'url',
          value: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      }

      // Add Mention matches
      for (const match of text.matchAll(mentionRegex)) {
        allMatches.push({
          type: 'mention',
          value: match[0],        // e.g., "@shedevrum_aibot"
          username: match[1],     // e.g., "shedevrum_aibot"
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      }

      // Sort matches by their starting index to process them in order
      allMatches.sort((a, b) => a.startIndex - b.startIndex);

      for (const match of allMatches) {
        // Add text before the current match
        if (match.startIndex > lastIndex) {
          newChildren.push(u('text', text.substring(lastIndex, match.startIndex)));
        }

        if (match.type === 'url') {
          // Handle bare URL
          const url = match.value;
          newChildren.push(
            u('link', { url: url.startsWith('http') ? url : `https://${url}` }, [
              u('text', url)
            ])
          );
        } else if (match.type === 'mention') {
          // Handle @mention
          const mentionText = match.value; // e.g., "@shedevrum_aibot"
          const username = match.username; // e.g., "shedevrum_aibot"
          const telegramLink = `https://t.me/${username}`;
          newChildren.push(
            u('link', { url: telegramLink }, [
              u('text', mentionText)
            ])
          );
        }

        lastIndex = match.endIndex;
      }

      // Add any remaining text after the last match
      if (lastIndex < text.length) {
        newChildren.push(u('text', text.substring(lastIndex)));
      }

      // If any changes were made, replace the original node
      if (newChildren.length > 0 && newChildren.length !== 1 || (newChildren.length === 1 && newChildren[0].value !== text)) {
        parent.children.splice(index, 1, ...newChildren);
        // Adjust the index to skip the newly added nodes, so we don't re-process them
        // and also correctly process subsequent nodes in the original parent.
        return [visit.SKIP, index + newChildren.length];
      }
    });
  };
}