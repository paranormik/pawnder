import { ActionButtons } from "@/components/home/ActionButtons";
import { CatCard, CatCardProps } from "@/components/home/CatCard";
import { EmptyState } from "@/components/home/EmptyState";
import { FilterBar } from "@/components/home/FilterBar";
import { SwipeOverlay } from "@/components/home/SwipeOverlay";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useVoteCatImageMutation } from "@/services/mutations/catMutations";
import { useCatBreeds } from "@/services/queries/catQueries";
import { Icon } from "@/utils/fonts";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";

const WINDOW_SIZE = 10;
const PREFETCH_THRESHOLD = 6;
const CHANGE_PAGE_TRESHOLD = 9;

const HomeScreen = () => {
  const voteMutation = useVoteCatImageMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCats, setCurrentCats] = useState<CatCardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allSwiped, setAllSwiped] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useCatBreeds(WINDOW_SIZE);

  const ref = useRef<SwiperCardRefType>(null);

  const [selectedFilter, setSelectedFilter] = useState(0);

  const onDislikePress = useCallback(() => {
    ref.current?.swipeLeft();
  }, []);

  const onLikePress = useCallback(() => {
    ref.current?.swipeRight();
  }, []);

  const onCardPress = useCallback(() => {
    ref.current?.flipCard();
  }, []);

  const renderCard = useCallback((image: CatCardProps) => {
    return <CatCard {...image} />;
  }, []);

  const renderFlippedCard = useCallback((_: CatCardProps, index: number) => {
    return (
      <View style={styles.renderFlippedCardContainer}>
        <Text style={styles.text}>Lovely cat</Text>
      </View>
    );
  }, []);

  const OverlayLabelRight = useCallback(() => {
    return <SwipeOverlay color="green" />;
  }, []);

  const OverlayLabelLeft = useCallback(() => {
    return <SwipeOverlay color="red" />;
  }, []);

  const cats = useMemo(() => {
    return (
      data?.pages
        ?.flatMap((page) => page)
        .map((cat) => ({
          image: cat.image?.url || "",
          name: cat.name,
          origin: cat.origin,
          affectionLevel: cat.affection_level,
          id: cat.image?.id || "",
        })) || []
    );
  }, [data]);

  useEffect(() => {
    if (cats.length === 10) {
      setCurrentCats(cats);
    }
  }, [cats]);

  useEffect(() => {
    if (currentIndex >= CHANGE_PAGE_TRESHOLD) {
      setCurrentCats(
        cats.slice(
          currentPage * WINDOW_SIZE - 1,
          (currentPage + 1) * WINDOW_SIZE - 1
        )
      );
      setCurrentIndex(0);
      setCurrentPage((prev) => prev + 1);
    }
  }, [cats, currentIndex, currentPage]);

  const onSwipe = useCallback(
    (direction: "left" | "right", cardIndex: number) => {
      voteMutation.mutate({
        image_id: currentCats[cardIndex].id,
        value: direction === "left" ? -1 : 1,
      });

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 500);
      if (cardIndex === PREFETCH_THRESHOLD && hasNextPage) {
        fetchNextPage();
      }
    },
    [currentCats, fetchNextPage, hasNextPage, voteMutation]
  );

  const hideControls = isLoading || allSwiped;

  return (
    <ScreenContainer
      style={{
        alignItems: "center",
      }}
    >
      <FilterBar
        options={[
          {
            icon: <Icon name="tinder" size={16} color="#BFBFC0" />,
            label: "Feed",
          },
          {
            icon: <Icon name="heart" size={22} color="#BFBFC0" />,
            label: "Favorite",
          },
        ]}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {hideControls ? (
          <EmptyState />
        ) : (
          <Swiper
            ref={ref}
            data={currentCats}
            key={currentCats[0]?.image}
            // activeIndex={currentIndex}
            cardStyle={styles.cardStyle}
            overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
            renderCard={renderCard}
            prerenderItems={1}
            onSwipeRight={(cardIndex) => {
              onSwipe("right", cardIndex);
            }}
            onSwipedAll={() => {
              if (isLoading) return;
              if (currentIndex !== 0) {
                setAllSwiped(true);
              }
            }}
            FlippedContent={renderFlippedCard}
            onSwipeLeft={(cardIndex) => {
              onSwipe("left", cardIndex);
            }}
            OverlayLabelRight={OverlayLabelRight}
            OverlayLabelLeft={OverlayLabelLeft}
            onPress={onCardPress}
          />
        )}
      </View>
      {!hideControls && (
        <ActionButtons
          onDislikePress={onDislikePress}
          onLikePress={onLikePress}
          style={styles.actionButtons}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    height: 48,
    position: "absolute",
    bottom: 0,
    left: 24,
    right: 24,
    gap: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  catName: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 16,
    lineHeight: 20,
    color: "#434141",
  },
  affectionLevel: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 16,
    lineHeight: 20,
    color: "#434141",
    textAlign: "right",
  },
  catOrigin: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 8,
    lineHeight: 10,
    color: "#BFBFC0",
  },
  actionButtons: {
    marginBottom: 100,
  },
  overlayLabelContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  renderCardContainer: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: "#baeee5",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "100%",
    height: "93%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#BFBFC0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  text: {
    color: "#001a72",
  },
});

export default HomeScreen;
