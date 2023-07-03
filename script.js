function drawWaterContainer() {
  const input = document.getElementById("input").value;
  const numbers = input.split(",").map(Number);

  // Calculate maximum water capacity
  // 3,0,2,0,4,1,1,7,0,0,3
  let maxCapacity = 0;
  let leftMax = 0;
  let rightMax = 0;
  let left = 0;
  let right = numbers.length - 1;
  let waterHeight = new Array(numbers.length);
  while (left < right) {
    if (numbers[left] < numbers[right]) {
      if (numbers[left] >= leftMax) {
        leftMax = numbers[left];
        waterHeight[left] = 0;
      } else {
        let capacity = leftMax - numbers[left];
        maxCapacity += capacity;
        waterHeight[left] = capacity;
      }
      left++;
    } else {
      if (numbers[right] >= rightMax) {
        rightMax = numbers[right];
        waterHeight[right] = 0;
      } else {
        let capacity = rightMax - numbers[right];
        maxCapacity += capacity;
        waterHeight[right] = capacity;
      }
      right--;
    }
  }
  // Draw water container
  const canvas = document.getElementById("container");
  const ctx = canvas.getContext("2d");
  const blockWidth = 40;
  const blockHeight = 40;
  const maxHeight = Math.max(...numbers);

  canvas.width = numbers.length * blockWidth;
  canvas.height = maxHeight * blockHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < maxHeight; i++) {
    for (let j = 0; j < numbers.length; j++) {
      //Draw block
      if (i < numbers[j]) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.fillRect(
          j * blockWidth,
          (maxHeight - i - 1) * blockHeight,
          blockWidth,
          blockHeight
        );
        ctx.strokeRect(
          j * blockWidth,
          (maxHeight - i - 1) * blockHeight,
          blockWidth,
          blockHeight
        );
      }
      //Draw water
      if (waterHeight[j] > 0 && i < waterHeight[j]) {
        ctx.fillStyle = "blue";
        ctx.fillRect(
          j * blockWidth,
          (maxHeight - i - numbers[j] - 1) * blockHeight,
          blockWidth,
          blockHeight
        );
      }
    }
  }

  // Display water capacity
  const capacityText = document.getElementById("max-capacity");
  capacityText.innerText = "Maximum water capacity: " + maxCapacity;
}

document.getElementById("input").addEventListener("input", drawWaterContainer);
