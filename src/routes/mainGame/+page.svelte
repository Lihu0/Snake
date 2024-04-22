<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import foodImgSprite from "$lib/assets/food.svg";
  import snakeBodySprite from "$lib/assets/snakeBody.svg";
  import snakeTailSprite from "$lib/assets/snakeTail.svg";
  import snakeInitialSprite from "$lib/assets/snakeInitialImg.svg";
  import snakeHeadSprite from "$lib/assets/snakeHead.svg";
  import snakeTurnedPieceSprite from "$lib/assets/turnedPiece.svg";
  import {
    CirclePause,
    RefreshCcw,
    CircleChevronLeft,
    Play,
  } from "lucide-svelte";

  import { swipe } from "svelte-gestures";

  let SwipeDirection: string;
  let target: HTMLElement;

  let canvas: HTMLCanvasElement;
  let pauseButton: HTMLButtonElement;
  let isPaused: boolean = $state(false);
  let score: number = $state(0);
  let highScore: number = $state(0);
  let isGameOver: boolean = $state(false);

  let direction: string;

  const bgColor: string = $page.url.searchParams.get("bg_color") || "#000000";
  const snakeColor: string =
    $page.url.searchParams.get("snake_color") || "#00ff00";
  const foodColor: string =
    $page.url.searchParams.get("food_color") || "#ff0000";
  const speed: number = parseInt($page.url.searchParams.get("speed") || "5");
  const borderColor: string =
    $page.url.searchParams.get("border_color") || "#ffffff";
  const gameHeight: number = parseInt(
    $page.url.searchParams.get("game_height") || "30"
  );
  const gameWidth: number = parseInt(
    $page.url.searchParams.get("game_width") || "30"
  );
  const isSimpleView: boolean =
    $page.url.searchParams.get("simple_view") == "on";

  const checkerBoardPatternColors: string[] = ["#d4f4dd", "#85e090"];

  const snakeSize: number = 15;

  function handleRefresh() {
    window.location.reload();
  }

  function handleSwipe(e: CustomEvent) {
    SwipeDirection = e.detail.direction;
    target = e.detail.target;

    if (SwipeDirection == "top" && direction != "bottom") {
      direction = "top";
    } else if (SwipeDirection == "bottom" && direction != "top") {
      direction = "bottom";
    } else if (SwipeDirection == "left" && direction != "right") {
      direction = "left";
    } else if (SwipeDirection == "right" && direction != "left") {
      direction = "right";
    }

    console.log(SwipeDirection, direction);
  }

  if (browser) {
    highScore = parseInt(localStorage.getItem("highScore") || "0");
  }

  $effect(() => {
    const ctx = canvas.getContext("2d");
    let foodImg = new Image();
    let snakeBodyImg = new Image();
    let snakeTailImg = new Image();
    let snakeInitialImg = new Image();
    let snakeHeadImg = new Image();
    let snakeTurnedPieceImg = new Image();
    foodImg.src = foodImgSprite;
    snakeBodyImg.src = snakeBodySprite;
    snakeTailImg.src = snakeTailSprite;
    snakeInitialImg.src = snakeInitialSprite;
    snakeHeadImg.src = snakeHeadSprite;
    snakeTurnedPieceImg.src = snakeTurnedPieceSprite;

    canvas.height = snakeSize * gameHeight;
    canvas.width = snakeSize * gameWidth;

    if (ctx) {
      let snakeXY: { x: number; y: number }[] = [
        {
          x: Math.floor(canvas.width / 2 / snakeSize) * snakeSize,
          y: Math.floor(canvas.height / 2 / snakeSize) * snakeSize,
        },
      ];
      let food: { x: number; y: number } = {
        x: Math.floor((Math.random() * canvas.width) / snakeSize) * snakeSize,
        y: Math.floor((Math.random() * canvas.height) / snakeSize) * snakeSize,
      };

      score = snakeXY.length - 1;

      function moveSnake() {
        if (!isPaused) {
          const head = snakeXY[0];
          let newHead = { x: head.x, y: head.y };

          switch (direction) {
            case "top":
              newHead.y -= snakeSize;
              break;
            case "bottom":
              newHead.y += snakeSize;
              break;
            case "left":
              newHead.x -= snakeSize;
              break;
            case "right":
              newHead.x += snakeSize;
              break;
          }

          snakeXY.unshift(newHead);
          snakeXY.pop();
        }
      }

      function handleKeydown(e: KeyboardEvent) {
        if ((e.key == "ArrowUp" || e.key == "w") && direction != "bottom") {
          direction = "top";
        } else if (
          (e.key == "ArrowDown" || e.key == "s") &&
          direction != "top"
        ) {
          direction = "bottom";
        } else if (
          (e.key == "ArrowLeft" || e.key == "a") &&
          direction != "right"
        ) {
          direction = "left";
        } else if (
          (e.key == "ArrowRight" || e.key == "d") &&
          direction != "left"
        ) {
          direction = "right";
        }
      }

      function handlePause() {
        if (isPaused) {
          document.addEventListener("keydown", handleKeydown);
          isPaused = false;
        } else {
          document.removeEventListener("keydown", handleKeydown);
          isPaused = true;
        }
      }

      document.addEventListener("keydown", (e) => {
        if (e.key == "p") {
          handlePause();
        }
      });
      pauseButton.addEventListener("click", handlePause);

      document.addEventListener("keydown", handleKeydown);

      setInterval(() => {
        moveSnake();

        for (let i = 1; i < snakeXY.length; i++) {
          if (snakeXY[i].x == snakeXY[0].x && snakeXY[i].y == snakeXY[0].y) {
            isGameOver = true;
          }
        }

        if (
          snakeXY[0].x < 0 ||
          snakeXY[0].x >= canvas.width ||
          snakeXY[0].y < 0 ||
          snakeXY[0].y >= canvas.height
        ) {
          isGameOver = true;
        }

        if (isGameOver) {
          document.removeEventListener("keydown", handleKeydown);
          return;
        }

        if (isSimpleView) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = foodColor;
          ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.3;
          for (let i = 0; i < canvas.width; i += snakeSize) {
            for (let j = 0; j < canvas.height; j += snakeSize) {
              ctx.strokeRect(i, j, 15, 15);
            }
          }

          ctx.fillStyle = snakeColor;
          snakeXY.forEach((segment) => {
            ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
          });
        } else {
          for (let i = 0; i < canvas.width; i += 15) {
            for (let j = 0; j < canvas.height; j += 15) {
              if ((i + j) % 2 == 0) {
                ctx.fillStyle = checkerBoardPatternColors[0];
                ctx.fillRect(i, j, 15, 15);
              } else {
                ctx.fillStyle = checkerBoardPatternColors[1];
                ctx.fillRect(i, j, 15, 15);
              }
            }

            ctx.drawImage(
              foodImg,
              food.x - 5,
              food.y - 5,
              snakeSize + 10,
              snakeSize + 10
            );
          }

          snakeXY.forEach(
            (segment: { x: number; y: number }, index: number) => {
              let angle: number = 0;

              const prevSegment = snakeXY[index - 1];
              const nextSegment = snakeXY[index + 1];

              function calcAngle(): number {
                if (snakeXY.length == 1) {
                  if (direction == "top") {
                    return 0;
                  }
                  if (direction == "bottom") {
                    return 180;
                  }
                  if (direction == "left") {
                    return 270;
                  }
                  if (direction == "right") {
                    return 90;
                  }
                  if (direction == undefined) {
                    return 0;
                  }
                }

                if (index == 0) {
                  if (nextSegment.x > segment.x) {
                    return 270;
                  }
                  if (nextSegment.x < segment.x) {
                    return 90;
                  }
                  // at this point, nextSegment.x = segment.x
                  if (nextSegment.y > segment.y) {
                    return 0;
                  }
                  return 180;
                }

                if (index == snakeXY.length - 1) {
                  if (prevSegment.x > segment.x) {
                    return 90;
                  }
                  if (prevSegment.x < segment.x) {
                    return 270;
                  }
                  // at this point, prevSegment.x = segment.x
                  if (prevSegment.y > segment.y) {
                    return 180;
                  }
                  return 0;
                }
                if (nextSegment.x == prevSegment.x) {
                  return 0;
                }
                if (nextSegment.y == prevSegment.y) {
                  return 90;
                }

                if (
                  (nextSegment.x < segment.x || prevSegment.x < segment.x) &&
                  (nextSegment.y < segment.y || prevSegment.y < segment.y)
                ) {
                  return 90;
                }
                if (
                  (nextSegment.x > segment.x || prevSegment.x > segment.x) &&
                  (nextSegment.y > segment.y || prevSegment.y > segment.y)
                ) {
                  return 270;
                }
                if (
                  (nextSegment.x < segment.x || prevSegment.x < segment.x) &&
                  (nextSegment.y > segment.y || prevSegment.y > segment.y)
                ) {
                  return 0;
                }
                if (
                  (nextSegment.x > segment.x || prevSegment.x > segment.x) &&
                  (nextSegment.y < segment.y || prevSegment.y < segment.y)
                ) {
                  return 180;
                }

                return 0;
              }

              angle = calcAngle();

              ctx.save();
              ctx.translate(
                segment.x + snakeSize / 2,
                segment.y + snakeSize / 2
              );
              ctx.rotate((angle * Math.PI) / 180);
              if (snakeXY.length == 1) {
                ctx.drawImage(
                  snakeInitialImg,
                  -snakeSize / 2,
                  -snakeSize / 2,
                  snakeSize,
                  snakeSize
                );
              } else if (index == snakeXY.length - 1) {
                ctx.drawImage(
                  snakeTailImg,
                  -snakeSize / 2,
                  -snakeSize / 2,
                  snakeSize,
                  snakeSize
                );
              } else if (index == 0) {
                ctx.drawImage(
                  snakeHeadImg,
                  -snakeSize / 2,
                  -snakeSize / 2,
                  snakeSize,
                  snakeSize
                );
              } else if (
                (nextSegment.x - segment.x) * (segment.y - prevSegment.y) !=
                (segment.x - prevSegment.x) * (nextSegment.y - segment.y)
              ) {
                ctx.drawImage(
                  snakeTurnedPieceImg,
                  -snakeSize / 2,
                  -snakeSize / 2,
                  snakeSize,
                  snakeSize
                );
              } else {
                ctx.drawImage(
                  snakeBodyImg,
                  -snakeSize / 2,
                  -snakeSize / 2,
                  snakeSize,
                  snakeSize
                );
              }
              ctx.restore();
            }
          );
        }

        if (snakeXY[0].x == food.x && snakeXY[0].y == food.y) {
          do {
            food = {
              x: Math.floor((Math.random() * canvas.width) / snakeSize) * snakeSize,
              y: Math.floor((Math.random() * canvas.height) / snakeSize) * snakeSize,
            };
          } while (snakeXY.some((segment) => segment.x == food.x && segment.y == food.y));
          snakeXY.push({ x: snakeXY[0].x, y: snakeXY[0].y });
          score = snakeXY.length - 1;
        }

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore.toString());
        }
      }, 860 / speed);
    }
  });
</script>

<main
  class="flex flex-col items-center justify-center h-screen relative"
>
  <canvas bind:this={canvas}></canvas>
  {#if isGameOver}
    <h1 class="text-6xl font-bold">Game Over!</h1>
  {/if}
  <p>Score: {score}</p>
  <p>High score: {highScore}</p>
</main>

{#if !isGameOver}
  <button
    bind:this={pauseButton}
    class="absolute top-0 right-0 md:mt-4 md:mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
    title="You can also pause/unpause the game by pressing &quot;p&quot;"
  >
    {#if isPaused}
      <Play />
    {:else}
      <CirclePause />
    {/if}
  </button>
{/if}

<a
  class="absolute top-12 right-0 md:mt-4 md:mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  href="/"
>
  <CircleChevronLeft />
</a>

<button
  class="absolute top-24 right-0 md:mt-4 md:mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onclick={handleRefresh}
>
  <RefreshCcw />
</button>

<svelte:body use:swipe on:swipe={handleSwipe} />
