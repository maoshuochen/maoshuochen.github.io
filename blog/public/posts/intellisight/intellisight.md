# IntelliSight - An NLP-Supported Interview Text Processing Tool

IntelliSight is the design research project from my master's thesis, *Design Research of Interview Text Processing Tool Supported by Natural Language Processing*. The project explores how NLP and human-in-the-loop interaction can improve the efficiency of interview text processing for user researchers.

Rather than treating AI as a fully automated replacement, IntelliSight positions AI as a collaborator. The system helps with transcription, summarization, coding recommendations, clustering, co-occurrence analysis, and evidence retrieval, while researchers keep control over interpretation and insight generation.

![](./img/transcript-coding.png)

## Research Context

Interview research produces large amounts of unstructured data: recordings, transcripts, notes, observations, codes, themes, and reports. In practice, researchers often move between many tools to process this material, which creates friction and makes it easy to lose context.

![](./img/user-interviews-trend.png)

![](./img/researchops-framework.jpg)

The core question of this project was:

**How might NLP and human-in-the-loop design improve interview text processing while preserving researchers' expert judgment?**

![](./img/research-framework.png)

## User Research

I interviewed 7 experienced interview researchers, students, and a qualitative research expert. Their workflows covered tools such as Feishu Docs, Feishu Minutes, Excel, MaxQDA, Atlas.ti, and FigJam.

The research process was summarized into five stages: preparing interview outlines, taking notes and recordings, transcribing and correcting text, coding and highlighting, and analyzing themes through canvases, tables, and reports.

From the interviews, I identified 17 needs, including automatic transcription, custom vocabulary recognition, grammar correction, filler-word filtering, text summarization, coding recommendations, audio-text alignment, flexible analysis structures, evidence citation, and collaboration.

## Design Strategy

The design was guided by three human-in-the-loop principles:

![](./img/automation-spectrum.png)

**Break tasks down into granular inputs**  
Instead of automatically coding an entire transcript at once, the system reacts to smaller researcher actions, such as selecting a passage.

![](./img/full-automation-flow.png)

![](./img/hitl-coding-flow.png)

**Give timely feedback and allow intervention**  
AI status, parameters, and results should be visible and adjustable.

![](./img/transcription-feedback-flow.png)

**Offer multiple outputs and keep improving**  
The system provides several candidate results. Researchers' choices become implicit feedback for future recommendations.

![](./img/human-in-the-loop-coding.png)

![](./img/design-goals.png)

## Data Framework

The product structure was shaped by the DIKW model. Recordings, transcripts, and notes form the data layer; highlights, codes, and memos form the information layer; canvas, table, and report analyses form the knowledge layer; and design ideas become the wisdom layer.

![](./img/research-data-framework.png)

![](./img/dikw-data-framework.png)

## Product System

IntelliSight is structured as a complete interview research workspace.

![](./img/ia-overall-flow.png)

![](./img/home-dashboard.png)

The collection modules support outline writing and interview notes. The note interface uses three columns: outline reference, real-time transcription, and timestamped notes.

![](./img/outline-flow.png)

![](./img/outline-editor.png)

![](./img/outline-editor-annotated.png)

![](./img/note-flow.png)

![](./img/note-interface.png)

The processing modules focus on transcripts, highlights, and codes. In the transcript editor, researchers can select text directly, receive coding recommendations, correct transcription errors, and jump to corresponding audio segments.

![](./img/transcript-flow.png)

![](./img/transcript-list.png)

![](./img/transcript-upload-flow.png)

![](./img/transcript-coding.png)

![](./img/transcript-coding-annotated.png)

![](./img/code-picker-anatomy.png)

![](./img/code-picker-flow.png)

![](./img/transcript-block-anatomy.png)

![](./img/text-editing-ai-assist.png)

The code board lets researchers organize code groups, inspect linked highlights, and use AI-generated code suggestions.

![](./img/code-flow.png)

![](./img/code-board.png)

![](./img/highlight-flow.png)

![](./img/highlight-page.png)

![](./img/highlight-preview.png)

The analysis modules provide three complementary structures: canvas analysis for free-form thinking, table analysis for co-occurrence, and report writing for evidence-backed outputs.

![](./img/canvas-flow.png)

![](./img/canvas-editor.png)

![](./img/canvas-analysis.png)

![](./img/canvas-clustering-flow.png)

![](./img/table-flow.png)

![](./img/table-list.png)

![](./img/table-analysis.png)

![](./img/table-analysis-annotated.png)

![](./img/report-flow.png)

![](./img/report-list.png)

![](./img/report-editor.png)

![](./img/report-editor-annotated.png)

![](./img/team-page.png)

![](./img/participants-page.png)

The visual system uses a quiet grey interface, a blue primary color, and small high-contrast highlight colors for codes and status cues.

![](./img/color-system.png)

![](./img/highlight-colors.png)

The prototype was also explored as a web implementation, with Vue and Arco Design on the frontend and Flask, PaddleNLP, and SQLite on the backend.

![](./img/frontend-code.png)

![](./img/backend-code.png)

## Evaluation

I created an interactive Figma prototype and tested it with 10 interview researchers who had recent interview text processing experience. The test included 8 tasks across outline, note, transcript, code, highlight, canvas, table, and report pages.

![](./img/usability-test.jpg)

The prototype received a SUS score of 82.25/100, corresponding to Grade A usability, and an average SEQ score of 6.25/7. Participants responded positively to the coding recommendations, integrated workflow, canvas analysis, and report citation features.

![](./img/sus-score.png)

![](./img/seq-score.png)

## Reflection

The core value of IntelliSight is not to let AI "do user research" automatically. It is to place automation next to human judgment, especially in repetitive and context-heavy steps such as transcription, coding, clustering, and evidence retrieval.

For AI products in expert workflows, better efficiency does not come from automation alone. It also comes from task decomposition, context preservation, transparent feedback, and giving users meaningful control.

![](./img/idea-exploration.png)
