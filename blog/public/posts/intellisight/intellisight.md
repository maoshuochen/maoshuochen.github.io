# IntelliSight - An NLP-Supported Interview Text Processing Tool

IntelliSight is my master's thesis project: a tool designed for user researchers who need to process interview recordings, transcripts, notes, codes, and themes into reliable research insights.

The final outcome is a Web product concept. It does not ask AI to replace researchers. Instead, it brings NLP into repetitive parts of the workflow, such as transcription, summarization, coding recommendations, clustering, and evidence citation, while keeping human judgment at the center of interpretation.

![](./img/transcript-coding.png)

## Context: The Bottleneck After Interviews

Interview data is often rich, but difficult to work with. A single study can contain recordings, transcripts, field notes, observations, highlights, codes, themes, and reports. The challenge is not only turning audio into text, but turning scattered text into information that can support design decisions.

![](./img/user-interviews-trend.png)

The rise of ResearchOps also reframed the project. Interview text processing is not just an individual habit or a single-tool problem; it is about how research teams manage data, tools, knowledge, and collaboration.

![](./img/researchops-framework.jpg)

In many workflows, researchers record in one tool, transcribe in another, correct text in a document, code in a spreadsheet or whiteboard, and then write the final report elsewhere. This creates three problems:

- Context gets lost between notes, audio, transcripts, and highlights.
- Researchers spend too much time copying, pasting, replaying, searching, and reorganizing.
- AI cannot simply take over because interview analysis depends on context, nuance, and research goals.

The core design question became:

**How might NLP improve the efficiency of interview text processing while preserving researchers' control over meaning and insight?**

## Research: Starting From Real Workflows

I interviewed 7 experienced interview researchers, students, and a qualitative research expert. Their workflows involved tools such as Feishu Docs, Feishu Minutes, Excel, MaxQDA, Atlas.ti, and FigJam.

The process was summarized into five stages:

- Preparation: writing interview outlines.
- Interviewing: taking notes, recording, and capturing observations.
- Transcription: uploading audio, generating transcripts, and correcting errors.
- Coding: reading text, selecting passages, adding codes, and replaying context.
- Theme analysis: reviewing codes, organizing materials, and producing reports.

The strongest need was not full automation. Researchers wanted to reduce repetitive work while keeping the connection between materials.

![](./img/design-goals.png)

## Strategy: Human-in-the-Loop, Not a Black Box

Interview analysis is not a good fit for fully automated decisions. Researchers need to judge whether a quote matters, whether a code fits, and whether a theme is meaningful in relation to the study goal.

IntelliSight therefore uses a human-in-the-loop strategy.

![](./img/automation-spectrum.png)

The design strategy was shaped by three principles:

**Break tasks into granular inputs**  
The system does not analyze the entire transcript and return a final answer. It supports smaller actions such as selecting text, editing codes, and organizing nodes.

**Provide timely feedback and intervention**  
AI status and parameters should be visible. For example, researchers can add custom vocabulary before transcription, check task progress, and decide whether to accept text corrections.

**Offer multiple outputs and keep improving**  
Code recommendations are presented as candidates, not conclusions. The researcher's selection becomes feedback for future recommendations.

![](./img/human-in-the-loop-coding.png)

This makes AI behave more like a research assistant: fast at retrieving, ranking, suggesting, and organizing; but not responsible for final interpretation.

## Product Framework: A Workspace From Collection to Insight

IntelliSight is organized around the full research workflow: collection, processing, analysis, and team management. Materials move between outlines, notes, transcripts, highlights, codes, canvases, tables, and reports.

![](./img/dikw-data-framework.png)

The dashboard gives researchers a quick way back to recent transcripts, codes, highlights, and analysis materials.

![](./img/home-dashboard.png)

## Experience 1: Capturing Interview Context

The note-taking interface uses three columns: outline reference, real-time transcription, and researcher notes. Each note block keeps a timestamp, making it easier to return to the related audio and transcript later.

The goal is to keep what happened during the interview connected to what the researcher sees during later analysis.

![](./img/note-interface.png)

The outline editor places interview questions and question suggestions in the same space, helping researchers prepare and organize prompts more quickly.

![](./img/outline-editor-annotated.png)

## Experience 2: Coding Directly on Transcripts

The transcript page is the core workspace. Researchers can select a passage directly in the transcript, and the system recommends existing codes or possible new codes extracted from the text.

Researchers can accept, edit, or ignore the suggestions. This turns coding into an action that stays close to the original context, rather than a copy-paste workflow across multiple tools.

![](./img/transcript-coding-annotated.png)

The code picker includes search, selected codes, recommended existing codes, recommended new codes, comments, and save actions. AI output is treated as a set of options, while the researcher makes the final decision.

![](./img/code-picker-anatomy.png)

The transcript page also supports quick replay and text correction. If researchers notice a transcription error while coding, they can edit the text directly and use grammar correction or simplification as assistance.

![](./img/text-editing-ai-assist.png)

## Experience 3: Keeping Codes and Highlights Manageable

The code board organizes codes by groups. Researchers can drag codes between groups, inspect linked highlights, and refine the coding structure as the project evolves.

![](./img/code-board.png)

The highlight page gathers all selected passages in one place. Researchers can filter by transcript, code, or participant, and preview the surrounding context.

![](./img/highlight-page.png)

![](./img/highlight-preview.png)

## Experience 4: Supporting Different Analysis Structures

Interview analysis is not linear, so IntelliSight provides three complementary structures.

**Canvas analysis** supports free-form thinking. Researchers can drag highlights and codes into an infinite canvas, connect nodes, and use AI-assisted clustering to identify themes.

![](./img/canvas-analysis.png)

![](./img/canvas-clustering-flow.png)

**Table analysis** supports structured co-occurrence analysis. Researchers can place codes and participants into rows and columns, then inspect how often different dimensions appear together.

![](./img/table-analysis.png)

**Report editing** turns analysis into deliverables. Researchers can cite highlights and codes directly while writing, making conclusions traceable to original interview materials.

![](./img/report-editor-annotated.png)

## Visual System and Prototype

IntelliSight is a professional work tool, so the interface is intentionally quiet. The product uses light grey and white surfaces, blue as the primary action color, and small highlight colors for codes and statuses.

![](./img/color-system.png)

![](./img/highlight-colors.png)

Beyond the Figma prototype, I also explored a Web implementation. The frontend was built with Vue and customized Arco Design components; the backend used Flask, PaddleNLP, and SQLite.

![](./img/frontend-code.png)

![](./img/backend-code.png)

## Evaluation

I tested the prototype with 10 researchers who had processed interview text at least twice in the previous six months. The test covered 8 tasks across outline, note, transcript, code, highlight, canvas, table, and report pages.

![](./img/usability-test.jpg)

The results were positive:

- Average SUS score: **82.25/100**, corresponding to Grade A usability.
- Average SEQ score: **6.25/7**.
- Participants responded positively to code recommendations, workflow integration, canvas analysis, and report citation.

![](./img/sus-score.png)

![](./img/seq-score.png)

The test also pointed to future improvements: AI features need stronger explainability; users should be able to turn algorithmic assistance on and off; advanced users need more flexible workspaces and plugin-style extensions.

## Reflection

IntelliSight is not about letting AI "do user research." It is about placing AI in the parts of the workflow that are repetitive, time-consuming, and easy to lose context in: transcription, summarization, code recommendation, clustering, co-occurrence analysis, and evidence citation.

This project helped me understand that the value of an AI product does not come from automation alone. It also comes from task decomposition, context preservation, transparent feedback, and meaningful user control. For expert workflows like user research, a good AI tool should help people reach judgment faster, not skip judgment for them.
