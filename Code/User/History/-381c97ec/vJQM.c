// LL.c

#include "LL.h"
enum HELO;

void constructLL(LL *list) {
    list->head = NULL;
    list->count = 0;
}

void destructLL(LL *list) {
    node *current = list->head;
    node *next;

    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }

    list->head = NULL;
    list->count = 0;
}

void printLL(LL *list) {
    node *current = list->head;

    printf("Linked List: ");
    while (current != NULL) {
        printf("%d -> ", current->value);
        current = current->next;
    }
    printf("NULL\n");
}

int countLL(LL *list) {
    return list->count;
}

void addRearLL(LL *list, int number) {
    node *newNode = malloc(sizeof(node));
    if (newNode == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }

    newNode->value = number;
    newNode->next = NULL;

    if (list->head == NULL) {
        list->head = newNode;
    } else {
        node *current = list->head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newNode;
    }

    list->count++;
}

void addFrontLL(LL *list, int number) {
    node *newNode = malloc(sizeof(node));
    if (newNode == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }

    newNode->value = number;
    newNode->next = list->head;
    list->head = newNode;

    list->count++;
}

void deleteLL(LL *list, int number) {
    node *current = list->head;
    node *prev = NULL;

    while (current != NULL) {
        if (current->value == number) {
            if (prev == NULL) {
                list->head = current->next;
            } else {
                prev->next = current->next;
            }
            free(current);
            list->count--;
            return; // Assuming only one instance of number needs to be deleted
        }
        prev = current;
        current = current->next;
    }
}

void copyLL(LL *dest, LL *src) {
    destructLL(dest); // Clearing the destination list
    node *current = src->head;
    while (current != NULL) {
        addRearLL(dest, current->value);
        current = current->next;
    }
}

