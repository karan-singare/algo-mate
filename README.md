# 📘 AlgoMate

🚀 **AlgoMate** is an **AI-powered learning companion** for mastering **Data Structures & Algorithms**.  
It combines structured lessons, interactive quizzes, algorithm visualizations, and an **on-device AI tutor** — all in one mobile app.  

---

## ✨ Features

- 📚 **Structured Lessons**  
  - Beginner → Advanced topics  
  - Progress tracking (AsyncStorage)  
  - “Mark as complete” for each lesson  

- 📝 **Practice Problems**  
  - Solve coding-style problems inside the app  
  - Save answers locally  
  - Get **AI-powered hints**  

- ❓ **Quizzes**  
  - Multiple-choice questions per topic  
  - Track scores  
  - AI explanations for answers  

- 🎨 **Algorithm Visualizations**  
  - Sorting visualizer (Bubble, Insertion, Selection)  
  - Tree traversal visualizer  
  - (Graph traversal coming soon)  

- 🤖 **AI Tutor**  
  - Powered by **Phi-3-mini ONNX model** (quantized for mobile)  
  - Ask questions directly in lessons  
  - AI-generated hints for practice problems  
  - Streaming responses for a ChatGPT-like experience  

- 🌙 **Theming**  
  - Dark/Light mode with persistence  

---

## 🛠️ Tech Stack

- **React Native** (bare workflow)  
- **UI Kitten** (Eva Design System)  
- **AsyncStorage** for persistence  
- **react-native-svg** for visualizations  
- **onnxruntime-react-native** for on-device AI inference  
- **@xenova/transformers** for tokenizer  

---

## 📂 Project Structure

```
src/
  @components/     # Reusable UI components
  @screens/        # Screens (home, lessons, practice, quiz, visualizers)
  @data/           # Lessons, problems, quizzes
  @hooks/          # Feature-specific hooks (progress, tutor, etc.)
  @services/       # AI service layer (onnxruntime, tokenizer)
  @theme/          # Theming setup (light/dark)
  @utils/          # Generic utils (storage wrapper, helpers)
```

---

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/algomate.git
   cd algomate
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install pods (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. Start Metro bundler:
   ```bash
   yarn start
   ```

5. Run the app:
   ```bash
   yarn android   # or yarn ios
   ```

---

## 📦 Models & Tokenizer

- Download **Phi-3-mini-4K-Instruct ONNX (int4, acc-level-4)** from Hugging Face.  
- Place in:
  ```
  assets/models/phi3/
  ```
- Files required:
  - `.onnx`, `.onnx.data`
  - `tokenizer.json`, `tokenizer_config.json`
  - `tokenizer.model`, `special_tokens_map.json`, `added_tokens.json`

---

<!-- ## 📸 Demo

Here's a glimpse of **AlgoMate in action** 👇  

| Feature                | Screenshot |
|-------------------------|------------|
| Home Screen + Progress  | ![Home Screen](./docs/images/home.png) |
| Lesson Detail + Tutor   | ![Lesson Tutor](./docs/images/lesson-tutor.png) |
| Sorting Visualizer      | ![Sorting](./docs/images/sorting.png) |
| Practice Problem + Hint | ![Practice](./docs/images/practice.png) |
| Quiz + AI Explanation   | ![Quiz](./docs/images/quiz.png) |

> 📌 Place your screenshots under `docs/images/` and update paths above.  
> You can also embed screen recordings (GIFs or mp4) for visualizers and tutor streaming. -->

---

## 🗺️ Roadmap

- [x] Lessons + progress tracking  
- [x] Practice problems + AI hints  
- [x] Quizzes + AI explanations  
- [x] Sorting & tree visualizers  
- [x] On-device AI tutor (Phi-3-mini ONNX)  
- [ ] **Interview Mode** (AI asks + evaluates DSA questions)  
- [ ] **Gamification** (XP, streaks, badges)  
- [ ] **Graph visualizer** (DFS, BFS)  
- [ ] **Cloud sync** (save progress across devices)  

---

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.  
