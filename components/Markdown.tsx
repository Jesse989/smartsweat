'use client';

import styled from '@emotion/styled';
import { Box, Divider } from '@mui/joy';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const StyledH1 = styled('h1')`
  font-weight: 500;
  font-size: 28px;
  line-height: 28px;
  margin-top: 16px;
`;
const StyledH2 = styled('h2')`
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  margin-top: 12px;
  line-height: 28px;
`;
const StyledH3 = styled('h3')`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  margin-top: 12px;
  line-height: 28px;
`;
const StyledH4 = styled('h4')`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-top: 12px;
  line-height: 28px;
`;
const StyledP = styled('p')`
  line-height: 26px;
`;

type Props = {
  children: string;
};

export const Markdown = ({ children }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h1: ({ node, ...props }) => <StyledH1 {...props} />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h2: ({ node, ...props }) => <StyledH2 {...props} />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h3: ({ node, ...props }) => <StyledH3 {...props} />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h4: ({ node, ...props }) => <StyledH4 {...props} />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        p: ({ node, ...props }) => <StyledP {...props} />,
        hr: () => <Divider sx={{ my: 1 }} />,

        ul(props) {
          const { children } = props;

          return (
            <Box
              sx={{
                overflowX: 'auto',
                fontSize: 'var(--joy-fontSize-md)',
                lineHeight: 1.6,
                color: 'var(--joy-palette-text-secondary)',
                overflowY: 'hidden',
              }}>
              <ul style={{ paddingLeft: 20, paddingRight: 20, margin: 0 }}>
                {children}
              </ul>
            </Box>
          );
        },
        ol(props) {
          const { children } = props;

          return (
            <Box
              sx={{
                overflowX: 'auto',
                fontSize: 'var(--joy-fontSize-md)',
                lineHeight: 1.6,
                color: 'var(--joy-palette-text-secondary)',
                overflowY: 'hidden',
              }}>
              <ol style={{ paddingLeft: 20, paddingRight: 20, margin: 0 }}>
                {children}
              </ol>
            </Box>
          );
        },
      }}>
      {children}
    </ReactMarkdown>
  );
};
