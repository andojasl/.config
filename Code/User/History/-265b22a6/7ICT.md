## Week 1
CPU consists of:
* PC - Program counter
* IR - Instruction register
* MAR - Memory address register
* MBR - Memory buffer register
* Excecusion unit
* I/O AR - Input/output address register
* I/O BR - Input/output buffer register

System bus - connects Main memory, I/O Module and Cpu.


# Exam session :(

## Fetch-execute/Instruction cycle
Inside of computer there is a clock that executes one of the following commmands in order on each click: Fetch, Decode, Execute. In Fetch command it fetches the address of the command in RAM and puts it to __Programme Counter (PC)__. On decode command it decodes the value of the the address that was fetched before and stores it in __Intstructor Register (IR)__. On  Execute command does the operation stored in the value of the address  in RAM and stores the output in __Accumulator__.

### RAM (Random Access Memory)
Stores addresses in one column and stores the value of the address in the value column. Value  column usualy  consists of two parts - instruction itself and and memory  address - adress of the unit, item that is included in the operation. 

### Examle 
|Address| Value |

|0      | Load 6|

|1      |ADD 7|

|2     | Store 6|

|3      |Jump 6|

## Interupts

Everything that needs immediate attention (Like button clicks or mouse movement or even user input) generates an interupt that gets handled in the interupt handler and stops current process to deal with it. 
- __ISO__ - Interupt Service Routine - gets started everytime an interupt is generated. In Interupt handler it determines what program the interupt belongs to, what is the source of the interupt and so on. Later on the interupt is forwarded to the interupt controller and CPU.
- __Interupt Handler__ - Software that handles interupts
- __Interupt Controller__ - Hardware that deals with interupts after receiving instructions from the interupt handler.
- __Nested Interupts__ - interupts that interupt other interupt like: process 1 --x interupt 1 --x interupt 2 --> interupt 1 --> process 1.
- __Sequential Interupts__ - Interupts that happen one right  after the other.

## Cache 
* Principle of Locality:
– Temporal Locality: recently accessed data likely to be accessed again
– Spatial Locality: data near recently accessed data likely to be accessed soon


CPU cache consists of three levels first one is the smallest but fastest, dedicated to its own CPU core. Level two is bigger but a bit slower (also on CPU core) and level three is the biggest, shared between all cores in the CPU but is the slowest as well. Data is firs searched in the first cache, then second, third and olny then on DRAM (RAM).
- DRAM - Dynamic Random Memory Access (Needs constant energy flow to store the data).
- SRAM - Static Random Memory Access  or chache (Does not need energy to store, is faster but way more expensive).

## Process Schedulinng
- Objective of multiprogramming is to have some process running at all times, to maximize CPU utilization.
- The objective of time sharing is to switch the CPU among processes so frequently that users can interact with each program while it is running.
- To meet these objectives, the process scheduler selects an available process (posibly  from a set of several available processes) for program execution on the CPU.
- Single-processor  system - only one process is running at the same time
- if there are more processes the rest will have to wait until the  CPU is free and can be rescheduled.


Process firstly goes to the __Job Queue__ - a queue that holds all the processes that have entered the system and are waiting to be admited into the __Ready Queue__ - a queue that holds all the processes that are *ready* and assigns each to the CPU based on prioriy. If  the  process is interupted, it gets swapped out (partially finished) and put back into the ready queue. If process requires I/O it is put into I/O waiting queues and after it gets its turn and executes I/O is then put back into the ready queue.

### I/O Communication Techniques:
- Programmed I/O: CPU is responsible for monitoring the status of I/O module and transferring data between memory and the I/O device. Ineficient as CPU is very involved.
- Interupt-driven I/O: I/O module interrupts CPU upon action. More efficient because CPU is not responsible for monitoring and it can run other processes while waiting.
- Direct Memory Access (DMA): the DMA controller manages the transfer between I/O device and memory. This way the CPU is not directly involved in the data transfer process and it enchances system performance for large data transfers.


## Processes
### Process elements
- Program code
- Set of data
- Status information
### Process Image
- collection of programme code, data, stack, attributes.
- includes all the information necessary if the process is swapped out and later swapped in - the complete state.
### Process Control Block (PCB)
Defines a process withing the operating system.Contains:
- Process ID
- Process State
- Programme Counter
- CPU registers
- CPU Scheduling inforamtion
- Accounting information
- Memory management information (Memory limits)
- I/O information 
Is created and managemed  by the os to manage the process, key  tool for supporting multiple processes.
### PCB vs Process Image
Process Image encapsulates the context of the process neccessary to continue the if the process was swapped out and later swap back in while PCB is a smaller data structure used for process management and tracking.

### Process states
- __Two-state process model__ - can only be in one of: Running, Not-running.
- __Five-state process model__ - Can be in: New, Ready, Blocked, Running, Exit. Can be in one suspend state(Disk) or Two suspend states (Disk, main memory).
### OS control tables
- Memory tables - track allocation of main, secondary memories, protection attributes and information about virtual memory.
- I/O tables- manages I/O devices, status availability etc.
- File tables- info about file existence
- Process tables - info about processes

### Process creation
Once the OS decides to create a new process, it:
- Assigns a unique process identifier
- Allocates space for the process
- Initializes the process control block
- Sets up appropriate linkages such as scheduling queues
- Creates or expands other data structures (e.g., accounting)
When to switch processes:
- Interrupt: Reaction to an asynchronous external event
- Trap: Handling of an error or exception condition
- Supervisor Call: Explicit request to an operating system function

## Threads
- A process can contain one or multiple threads. Thread is a sequencial stream within a Process.
- Thread execution states: running, ready, blocked.
- Types of threads: 
   - ULT(User level threads)- application, kernel not aware
   - KLT(Kernel- level threads) - managed by kernel
   