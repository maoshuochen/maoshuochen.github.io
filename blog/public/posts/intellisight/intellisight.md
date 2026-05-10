# IntelliSight - An NLP-Supported Interview Text Processing Tool

IntelliSight is the design research project from my master's thesis, *Design Research of Interview Text Processing Tool Supported by Natural Language Processing*. The project explores a practical question in user research: how recordings, transcripts, notes, codes, themes, and reports can be connected into one continuous workflow, while NLP reduces repetitive work without replacing the researcher's judgment.

The final outcome is a Web tool concept for interview researchers. Instead of treating AI as a fully automated analyst, IntelliSight uses a human-in-the-loop model: algorithms support transcription, retrieval, recommendation, summarization, clustering, and evidence linking, while researchers keep control over semantic interpretation and insight generation.

![](./img/transcript-coding.png)

## Research Context

Interview research creates a large amount of unstructured material: audio recordings, transcripts, notes, observations, highlights, codes, themes, and reports. The most time-consuming part is not only transcription, but the work of turning raw text into information that can be analyzed and used for design decisions.

![](./img/user-interviews-trend.png)

The rise of ResearchOps also reframed the project. Interview text processing is not a single tool problem; it is about how a research team manages data, tools, knowledge, and collaboration across projects.

![](./img/researchops-framework.jpg)

In current workflows, researchers often move between many tools: meeting software for recording, transcription services for text, documents for correction, spreadsheets or whiteboards for coding and clustering, and another document for reporting. This fragmentation creates repeated work and makes it easy to lose context.

The core question of IntelliSight was:

**How might NLP and human-in-the-loop interaction improve interview text processing while preserving researchers' expert judgment?**

The thesis structure connected interview research, NLP, and human-AI collaboration theory, then translated them into user research, case analysis, design strategy, information architecture, interface design, prototype implementation, and usability evaluation.

![](./img/research-framework.png)

## User Research

I interviewed 7 experienced interview researchers, students, and a qualitative research expert. Their workflows covered Feishu Docs, Feishu Minutes, Excel, MaxQDA, Atlas.ti, FigJam, and other mixed toolchains.

The workflow was summarized into five stages:

- Preparing: writing interview outlines.
- Conducting: taking notes, recording audio, and capturing observations.
- Transcribing: uploading recordings, generating transcripts, and correcting errors.
- Coding: reading text, highlighting passages, receiving code recommendations, and replaying context.
- Analyzing: reviewing codes, clustering themes on canvases, using tables, and producing reports.

From the interviews, I identified 17 user needs, including automatic transcription, custom vocabulary recognition, grammar correction, filler-word filtering, text summarization, code recommendation, audio-text alignment, flexible analysis structures, citation of highlights and codes, and collaboration.

## Design Strategy

The project used three human-in-the-loop principles to guide the product design.

First, the project compared no automation, human-in-the-loop automation, and full automation. IntelliSight chooses the middle path: AI improves speed, but researchers can still intervene at the moments where meaning and interpretation matter.

![](./img/automation-spectrum.png)

**Break tasks down into granular inputs**  
Instead of automatically coding an entire transcript at once, the system reacts to smaller researcher actions. For example, after the researcher selects a passage, the system recommends related codes and possible new codes.

Full automation can be useful for finding broad topics quickly, but it often lacks the project-specific interpretation that qualitative research depends on.

![](./img/full-automation-flow.png)

The human-in-the-loop coding flow breaks the process into a repeatable loop: select text, generate suggestions, confirm or edit, and let the system learn from the decision.

![](./img/hitl-coding-flow.png)

**Give timely feedback and allow intervention**  
AI status, parameters, and results should be visible and adjustable. Before transcription, for instance, users can enter professional terms or names to improve recognition accuracy. During processing, the system gives feedback on status and estimated time.

![](./img/transcription-feedback-flow.png)

**Offer multiple outputs and keep improving**  
The system provides several candidate results rather than one final answer. Researchers' choices become implicit feedback that improves future recommendations.

![](./img/human-in-the-loop-coding.png)

These principles were condensed into three design goals: integrate with the research workflow, support multiple data structures, and reduce repeated work through human-AI collaboration.

![](./img/design-goals.png)

## Data Framework

To make the tool match the cognitive process of research, I reorganized interview materials through the DIKW model.

In IntelliSight, recordings, transcripts, and interview notes are treated as data. Highlights, codes, and analysis notes become information. Canvas analysis, table analysis, and reports become knowledge. Design opportunities and ideas generated from the research become the wisdom layer.

![](./img/research-data-framework.png)

At the product level, data moves between Record, Transcript, Note, Highlight, Code, Canvas, Table, and Report modules.

![](./img/dikw-data-framework.png)

## Product System

IntelliSight is structured as a complete interview research workspace. Its information architecture includes collection, processing, analysis, and team management modules.

![](./img/ia-overall-flow.png)

The home dashboard gives researchers a quick way back to recent transcripts, codes, highlights, and analysis materials.

![](./img/home-dashboard.png)

### Collection: Outline and Notes

The outline page helps researchers prepare interview questions and receive question suggestions based on keywords. The note interface uses three columns: outline reference, real-time transcription, and timestamped notes. Notes are automatically linked to the corresponding audio and transcript context.

**Outline flow**

![](./img/outline-flow.png)

**Outline editor**

![](./img/outline-editor.png)

**Annotated outline interaction**

![](./img/outline-editor-annotated.png)

**Note-taking flow**

![](./img/note-flow.png)

**Interview note interface**

![](./img/note-interface.png)

### Processing: Transcript, Highlight, and Code

The transcript page is the core workspace. Researchers can upload audio, generate transcripts, select text directly, receive code recommendations, correct transcription errors, and jump back to the corresponding audio segment through timestamps.

**Transcript flow**

![](./img/transcript-flow.png)

**Transcript list**

![](./img/transcript-list.png)

**Upload and transcription feedback**

![](./img/transcript-upload-flow.png)

**Transcript coding interface**

![](./img/transcript-coding.png)

**Annotated transcript interaction**

![](./img/transcript-coding-annotated.png)

**Code picker anatomy**

![](./img/code-picker-anatomy.png)

**Code picker flow**

![](./img/code-picker-flow.png)

**Transcript block anatomy**

![](./img/transcript-block-anatomy.png)

**AI-assisted text correction and simplification**

![](./img/text-editing-ai-assist.png)

The code board lets researchers organize code groups, inspect linked highlights, drag codes between groups, and use full-transcript recommendation to discover potential themes.

**Code flow**

![](./img/code-flow.png)

**Code board**

![](./img/code-board.png)

**Highlight flow**

![](./img/highlight-flow.png)

**Highlight management**

![](./img/highlight-page.png)

**Highlight preview**

![](./img/highlight-preview.png)

### Analysis: Canvas, Table, and Report

The analysis stage provides three complementary structures.

Canvas analysis supports free-form thinking. Researchers can drag codes and highlights into an infinite canvas, connect nodes, and use AI-assisted clustering based on text similarity.

**Canvas flow**

![](./img/canvas-flow.png)

**Canvas editor**

![](./img/canvas-editor.png)

**Annotated canvas analysis**

![](./img/canvas-analysis.png)

**AI clustering flow**

![](./img/canvas-clustering-flow.png)

Table analysis supports more structured co-occurrence analysis. Users can choose codes or participants as row and column dimensions, then inspect how frequently different variables appear together.

**Table flow**

![](./img/table-flow.png)

**Table list**

![](./img/table-list.png)

**Co-occurrence table**

![](./img/table-analysis.png)

**Annotated table interaction**

![](./img/table-analysis-annotated.png)

Report writing supports citation of codes and highlights, so conclusions can be traced back to original interview evidence.

**Report flow**

![](./img/report-flow.png)

**Report list**

![](./img/report-list.png)

**Report editor**

![](./img/report-editor.png)

**Annotated report citation**

![](./img/report-editor-annotated.png)

### Collaboration and Implementation

The team page supports member and permission management. The participant page supports custom participant attributes, which can later be used for filtering and analysis.

![](./img/team-page.png)

![](./img/participants-page.png)

The visual system uses a low-distraction light gray background, a blue primary color, and small highlight colors for codes and states, so researchers can focus on the text material.

![](./img/color-system.png)

![](./img/highlight-colors.png)

I also explored a Web implementation: the front end used Vue and customized Arco Design components, while the back end used Flask, PaddleNLP, and SQLite to build basic NLP and data capabilities.

![](./img/frontend-code.png)

![](./img/backend-code.png)

## Evaluation

I created an interactive Figma prototype and tested it with 10 interview researchers who had processed interview transcripts at least twice in the previous six months. The test included 8 tasks across outline, note, transcript, code, highlight, canvas, table, and report pages.

![](./img/usability-test.jpg)

The evaluation used SUS, SEQ, and post-test interviews:

- SUS average score: 82.25/100, corresponding to Grade A usability.
- SEQ average score: 6.25/7, showing positive task-level usability.
- Participants responded positively to code recommendations, workflow integration, canvas analysis, and report citation.

![](./img/sus-score.png)

![](./img/seq-score.png)

The test also revealed directions for further work: stronger AI explainability, more algorithm switches, more flexible workspace customization, plug-in extension, and richer analysis visualization.

## Reflection

The core value of IntelliSight is not to let AI "do user research" automatically. It is to place automation next to human judgment, especially in repetitive and context-heavy steps such as transcription, summarization, coding recommendations, clustering, co-occurrence analysis, and evidence retrieval.

For AI products in expert workflows, better efficiency does not come from automation alone. It also comes from task decomposition, context preservation, transparent feedback, and giving users meaningful control. For qualitative research, a good AI tool should be a reliable research partner, not a black-box conclusion machine.

![](./img/idea-exploration.png)
