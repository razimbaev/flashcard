package com.flashcard.flashcard;

import com.flashcard.flashcard.model.Card;
import com.flashcard.flashcard.model.Tag;
import com.flashcard.flashcard.repository.CardRepository;
import com.flashcard.flashcard.repository.TagRepository;

import java.util.*;

public class InitTestData {
    private static Tag even, odd, multiplesOfThree;

    static {
        even = new Tag();
        even.setTagName("EVEN");

        odd = new Tag();
        odd.setTagName("ODD");

        multiplesOfThree = new Tag();
        multiplesOfThree.setTagName("MULTIPLES_OF_THREE");
    }

    public static void saveTestData(CardRepository cardRepository, TagRepository tagRepository) {
        List<Card> cards = generateCardsUntil(100);

        tagRepository.save(even);
        tagRepository.save(odd);
        tagRepository.save(multiplesOfThree);

        cardRepository.saveAll(cards);
    }

    private static List<Card> generateCardsUntil(int num) {
        List<Card> cards = new ArrayList<>(num+1);

        Card zero = new Card();
        zero.setCardFront("0");
        zero.setCardBack("zero");
        cards.add(zero);

        for (int x = 1; x <= num; x++) {
            Card card = new Card();
            card.setCardFront(x + "");
            card.setCardBack(getNumAsString(x));
            card.setTags(getTagsForNum(x));
            cards.add(card);
        }

        return cards;
    }

    private static Set<Tag> getTagsForNum(int x) {
        Set<Tag> tags = new HashSet<>();
        if (x % 2 == 0) {
            tags.add(even);
        } else {
            tags.add(odd);
        }

        if (x % 3 == 0)
            tags.add(multiplesOfThree);
        return tags;
    }

    private static String getNumAsString(int num) {
        String[] thousandPlaces = {"", "thousand", "million", "billion", "trillion"};

        Deque<StringBuilder> numberParts = new LinkedList<>();
        int thousandPlacePos = 0;
        while (num > 0 && thousandPlacePos < thousandPlaces.length) {
            if (thousandPlacePos == 0) {
                numberParts.addFirst(getThreeDigits(num%1000));
            } else {
                if (num%1000 > 0) {
                    StringBuilder s = getThreeDigits(num%1000);
                    s.append(" ");
                    s.append(thousandPlaces[thousandPlacePos]);
                    numberParts.addFirst(s);
                }
            }


            thousandPlacePos++;
            num = num/1000;
        }

        return String.join(" ", numberParts);
    }

    private static StringBuilder getThreeDigits(int num) {
        StringBuilder s = new StringBuilder();
        if (num >= 100) {
            s.append(getFirstPlaceDigit(num/100));
            s.append(" hundred");
            num = num % 100;
            if (num > 0)
                s.append(" ");
        }

        if (num >= 10 && num <= 19) {
            s.append(getTeenNumbers(num));
            return s;
        }

        if (num >= 10) {
            s.append(getSecondPlaceDigit(num/10));
            s.append(" ");
        }

        s.append(getFirstPlaceDigit(num%10));
        return s;
    }

    private static String getTeenNumbers(int num) {
        switch (num) {
            case 10:
                return "ten";
            case 11:
                return "eleven";
            case 12:
                return "twelve";
            case 13:
                return "thirteen";
            case 14:
                return "fourteen";
            case 15:
                return "fifteen";
            case 16:
                return "sixteen";
            case 17:
                return "seventeen";
            case 18:
                return "eighteen";
            case 19:
                return "nineteen";
        }
        throw new IllegalArgumentException("Teen numbers should be between 10 and 19 inclusive");
    }

    private static String getSecondPlaceDigit(int num) {
        switch (num) {
            case 0:
                return "";
            case 2:
                return "twenty";
            case 3:
                return "thirty";
            case 4:
                return "forty";
            case 5:
                return "fifty";
            case 6:
                return "sixty";
            case 7:
                return "seventy";
            case 8:
                return "eighty";
            case 9:
                return "ninety";
        }
        throw new IllegalArgumentException("Second Place Digit should be between 0 and 9 inclusive (1 case is handled separately)");
    }

    private static String getFirstPlaceDigit(int num) {
        switch (num) {
            case 0:
                return "";
            case 1:
                return "one";
            case 2:
                return "two";
            case 3:
                return "three";
            case 4:
                return "four";
            case 5:
                return "five";
            case 6:
                return "six";
            case 7:
                return "seven";
            case 8:
                return "eight";
            case 9:
                return "nine";
        }
        throw new IllegalArgumentException("Single Digit should be between 0 and 9 inclusive");
    }
}
